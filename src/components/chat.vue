<template>
    <div class="main">
        <div class="prompt-box" ref="autoResizeDiv">
            <span style="display: flex;justify-content: space-between;align-items: start;">
                <textarea v-model="promptContent" @keydown.enter="sendPrompt" class="prompt-input"
                    placeholder="Ask Pundit AI" ref="promptTextArea"></textarea>
                <img src="../assets/write.gif" alt="enter" class="enter-icon" v-show="isIconAnimated">
                <img src="../assets/write.png" alt="enter" class="enter-icon" v-show="!isIconAnimated"
                    @click="sendPrompt">
            </span>
            <div class="line"></div>
            <div class="options">
                <div class="word-count">
                    <h3 class="options-subtitle" style="margin-bottom: 0.2rem;margin-right: 0.5rem;">Word Count</h3>
                    <input type="number" value="10000" v-model="wcount">
                </div>
                <div class="diagram-check">
                    <input type="checkbox" v-model="diagrams">
                    <h3 class="options-subtitle">Enable Diagrams</h3>
                </div>
                <div class="bullets-check">
                    <input type="checkbox" v-model="bullets">
                    <h3 class="options-subtitle">Bullet Formatting</h3>
                </div>
            </div>
        </div>
        <span class="placeholder-content fade-into-view" ref="placeholderContent" v-if="isPlaceholderVisible">
            <img src="../assets/star.png" alt="Star">
            <h1 class="placeholder-title">Hi, what can I help you with?</h1>
            <span class="idea-wrapper">
                <img @click="promptContent = 'Generate an essay on the evolution of LLMs'" src="../assets/place1.png" class="placeholder-idea">
                <img @click="promptContent = 'Generate an essay on the evolution of LLMs'" src="../assets/place2.png" class="placeholder-idea">
                <img @click="promptContent = 'Generate an essay on the evolution of LLMs'" src="../assets/place3.png" class="placeholder-idea">
            </span>

        </span>
        <span class="subtopics-gen fade-into-view" v-if="isIconAnimated">
            <img src="../assets/star.png" alt="Star" class="rotate">
            <h1 v-if="!subtopic">Building knowledge graph</h1>
            <Transition name="fade-in-place">
                <h1 :key="subtopic">{{ subtopic }}</h1>
            </Transition>
        </span>
        <div class="fixed-elements" v-if="responseParts.length">
            <div class="fixed-btn" @click="copyToClipboard">
                <img src="../assets/copy.png" alt="Copy" class="icon">
            </div>
            <div class="fixed-btn" @click="generatePDF">
                <img src="../assets/download.png" alt="Copy" class="icon">
            </div>
        </div>
        <div class="response-box" v-if="responseParts.length">
            <template v-for="(part, index) in responseParts" :key="index">
                <p v-if="part.type === 'text'" v-html="part.content"></p>
                <div v-if="part.type === 'mermaid'" class="mermaid mermaid-diagram"
                    style="margin-top: -0.5rem; margin-bottom: 1rem;">{{
                        part.content }}</div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { jsPDF } from 'jspdf'
import mermaid from 'mermaid'

const isIconAnimated = ref(false);
const isPlaceholderVisible = ref(true)
const promptTextArea = ref(null);
const autoResizeDiv = ref(null)
const promptContent = ref("");
const responseParts = ref([]);
const subtopic = ref("")
let subtopicsList = []
let currentIndex = 0;
let intervalId;

const wcount = ref(10000)
const bullets = ref(false)
const diagrams = ref(true)

mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'forest'
});

const generatePDF = async () => {
    try {
        const doc = new jsPDF()
        doc.setFontSize(12)

        if (!responseParts.value.length) {
            throw new Error('Content element not found')
        }

        const responseTextContent = responseParts.value
            .filter(part => part.type === 'text')
            .map(part => part.content)
            .join('\n')

        doc.text(responseTextContent, 10, 10)
        doc.save("pundit.pdf")
    } catch (error) {
        console.error('Error generating PDF:', error)
    }
}

const updateDisplayedSubtopic = () => {
    console.log("Hello")
    console.log(subtopicsList.data)
    if (subtopicsList.data.length > 0) {
        subtopic.value = subtopicsList.data[currentIndex];
        console.log(subtopic.value)
        currentIndex = (currentIndex + 1) % subtopicsList.data.length;
    }
};

const startInterval = () => {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(updateDisplayedSubtopic, 2500);
};

function copyToClipboard() {
    const responseTextContent = responseParts.value
        .filter(part => part.type === 'text')
        .map(part => part.content)
        .join('\n')
    navigator.clipboard.writeText(responseTextContent)
}

const sendPrompt = async () => {
    promptTextArea.value.blur()
    isPlaceholderVisible.value = false;
    isIconAnimated.value = true;
    responseParts.value = [];

     fetch(`http://localhost:8000/topics?prompt=${promptContent.value}`, {
    method: 'POST',
    headers: {
        'accept': 'application/json'
    },
    })
    .then(response => response.json())
    .then(data => {subtopicsList = data; currentIndex = 0; subtopic.value = subtopicsList[0]; startInterval();})
    .catch(error => console.error('Error:', error));
    fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: promptContent.value, word_count: `${wcount.value}`, complexity: "hard", diagram_checked: diagrams.value })
    })
        .then(response => response.json())
        .then(data => {
            isIconAnimated.value = false;
            console.log(data.content[0])
            processResponse(data.content[0]);
            clearInterval(intervalId);
        })
        .catch(error => {
            console.error('Error:', error);
            isIconAnimated.value = false;
        }); 
};

const processResponse = async (content) => {
    if (typeof content !== 'string') {
        console.error('Invalid response content');
        return;
    }

    const parts = [];
    const mermaidRegex = /```mermaid\s+([\s\S]*?)\s+```/g;
    let lastIndex = 0;

    // First, handle Mermaid blocks
    let match;
    while ((match = mermaidRegex.exec(content)) !== null) {
        // Process text before the Mermaid block, including *+ replacement
        if (match.index > lastIndex) {
            const textBeforeMermaid = content
                .substring(lastIndex, match.index)
                .replace(/(\* |- |• )/g, '<br/><br/>');
            parts.push({ type: 'text', content: textBeforeMermaid });
        }

        // Add the Mermaid block without modifying its content
        parts.push({ type: 'mermaid', content: match[1] });
        console.log(match[1]);
        lastIndex = mermaidRegex.lastIndex;
    }

    // Process any remaining text after the last Mermaid block
    if (lastIndex < content.length) {
        const remainingText = content
            .substring(lastIndex)
            .replace(/(\* |- |• )/g, '<br/><br/>');
        parts.push({ type: 'text', content: remainingText });
    }

    responseParts.value = parts;
    await renderMermaidDiagrams();
};

const renderMermaidDiagrams = async () => {
    await nextTick();
    const elements = document.querySelectorAll('.mermaid-diagram');
    const validElements = [];
    for (const element of elements) {
        try {
            await mermaid.parse(element.textContent);
            validElements.push(element);
        } catch (error) {
            console.error('Mermaid parsing error:', error);
            element.remove();
        }
    }
    if (validElements.length > 0) {
        await mermaid.run(undefined, '.mermaid-diagram');
    }
};

const placeholderContent = ref(null)
onMounted(() => {
    setTimeout(() => {
        placeholderContent.value.style.opacity = '1'
    }, 1)
})
</script>

<style scoped>
.main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1rem;
    font-family: Poppins;
}

.options {
    margin-top: 1.3rem;
    height: 2.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0.5rem;
}

.word-count,
.bullets-check,
.diagram-check {
    display: flex;
    margin-right: 2rem;
    font-size: 1rem;
    align-items: end;
}

.placeholder-content img {
    height: 30%;
    margin-bottom: 1rem;
    width: auto;
}

.subtopics-gen {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.rotate {
    transition: transform 0.3s ease;
    animation: rotate 3s infinite linear;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

.idea-wrapper {
    display: flex;
    justify-content: center;
    width: 80%;
    padding: 0rem 20%;
}

.line {
    background-color: rgba(19, 5, 64, 0.2);
    padding: 0.05rem;
    width: 100%;
}

.options-subtitle {
    margin-right: 0.5rem;
    margin-bottom: 0.2rem;
}

.word-count input {
    width: 5rem;
    padding-left: 0.5rem;
    height: 1.7rem;
    outline: none;
    border: 1px solid #9d93bc;
    border-radius: 0.2rem;
    font-family: Poppins;
}

.diagram-check {
    margin-right: 1rem;
}

.bullets-check input,
.diagram-check input {
    height: 1.2rem;
    width: 1.2rem;
    margin-right: 0.5rem;
}

.fade-into-view {
    animation: floatIn 1.7s ease forwards;
}

@keyframes floatIn {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.fixed-elements {
    position: fixed;
    top: 29.2vh;
    transform: translateX(31.3vw);
}

.fixed-btn {
    width: 2.7rem;
    border: 1px solid #cac1e8;
    background-color: #fff;
    cursor: pointer;
    padding: 0.5rem 0.8rem;
    border-radius: 0.3rem;
    margin-bottom: 0.5rem;
}

.icon {
    height: 1rem;
}

.fixed-btn:hover {
    background-color: #eae7f1;
}

.placeholder-content {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.placeholder-title {
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: 500;
    color: #130540;
}

.placeholder-idea {
    max-height: 10rem; 
    width: auto; border: 1px solid rgba(19, 5, 64, 0.2);
    border-radius: 0.3rem; cursor: pointer;
    margin-right: 1rem;
}

.response-box {
    margin-top: 3rem;
    border-radius: 0.5rem;
    border: 1px solid #cac1e8;
    color: #130540;
    padding: 1.5rem;
    width: 60%;
    line-height: 1.7rem;
}

.enter-icon {
    height: 1.7rem;
    margin-top: 0.5rem;
    cursor: pointer;
}

.prompt-box {
    width: 60%;
    height: 8rem;
    border-radius: 0.4rem;
    border: solid 1px #130540;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
}

.prompt-input {
    outline: none;
    border: none;
    resize: none;
    font-size: 0.9rem;
    background-color: transparent;
    height: 2.5rem;
    margin-top: 0.8rem;
    width: 90%;
    font-family: Poppins;
    scrollbar-width: none;
}

.fade-in-place-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-in-place-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-in-place-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Hide scrollbar */
.prompt-input::-webkit-scrollbar {
    width: 0;
    height: 0;
}

.prompt-input::-moz-scrollbar {
    width: 0;
    height: 0;
}

@media only screen and (max-width: 740px) {
    .main {
        padding: 1rem 0rem;
    }

    .prompt-box {
        width: 85%;
        height: 12.2rem;
    }

    .word-count,
    .bullets-check,
    .diagram-check {
        margin-bottom: 0.3rem;
    }

    .response-box {
        width: 80%;
    }

    .placeholder-title {
        text-align: center;
    }

    .placeholder-idea {
        width: 80vw;
    }

    .fixed-elements {
        top: 13.3rem;
        margin-left: 3vw;
    }

    .options {
        flex-direction: column;
        align-items: start;
    }
}
</style>

<style>
table {
    border-collapse: collapse !important;
    width: 100% !important;
    margin-bottom: 2rem;
}

th,
td {
    border: 1px solid black !important;
    padding: 8px !important;
    text-align: left !important;
}

th {
    background-color: #f2f2f2 !important;
}
</style>