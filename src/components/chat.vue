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
            <h1 class="placeholder-title">Hi, what can I help you with?</h1>
            <div class="placeholder-idea" @click="promptContent = 'Generate an essay on the evolution of LLMs'">Generate
                an essay on the evolution of LLMs</div>
            <div class="placeholder-idea"
                @click="promptContent = 'Produce a report on the current geopolitical landscape'">Produce a report on
                the current geopolitical landscape</div>
            <div class="placeholder-idea"
                @click="promptContent = 'Write an article about the history of medieval trade routes between Asia & Europe'">
                Write an article about the history of medieval trade routes between Asia & Europe
            </div>
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

function copyToClipboard() {
    const responseTextContent = responseParts.value
        .filter(part => part.type === 'text')
        .map(part => part.content)
        .join('\n')
    navigator.clipboard.writeText(responseTextContent)
}

const sendPrompt = async () => {
    promptTextArea.value.blur()
    isIconAnimated.value = true;
    responseParts.value = [];  // Reset parts array
    fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: promptContent.value, word_count: `${wcount.value}`, point_checked: bullets.value, diagram_checked: diagrams.value })
    })
        .then(response => response.json())
        .then(data => {
            isIconAnimated.value = false;
            isPlaceholderVisible.value = false;
            console.log(data.content[0])
            processResponse(data.content[0]);
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
    opacity: 0;
    transition: opacity 1.3s ease;
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

.placeholder-idea {
    cursor: pointer;
    color: rgba(19, 5, 64, 0.8);
    border: 1px solid rgba(19, 5, 64, 0.2);
    border-radius: 0.3rem;
    padding: 0.8rem 1rem;
    width: 40vw;
    line-height: 1.3rem;
    text-align: center;
    margin-bottom: 1rem;
}

.placeholder-title {
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: 500;
    color: #130540;
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