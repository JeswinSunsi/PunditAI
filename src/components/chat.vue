<template>
    <div class="main">
        <div class="prompt-box" ref="autoResizeDiv">
            <textarea v-model="promptContent" class="prompt-input" placeholder="Ask Pundit AI" @input="resizeTextarea"
                ref="autoResizeTextArea"></textarea>
            <img src="../assets/write.gif" alt="enter" class="enter-icon" v-show="isIconAnimated">
            <img src="../assets/write.png" alt="enter" class="enter-icon" v-show="!isIconAnimated" @click="sendPrompt">
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
                <div v-if="part.type === 'mermaid'" class="mermaid mermaid-diagram" stye="margin-bottom: 1rem;">{{
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
const autoResizeTextArea = ref(null);
const autoResizeDiv = ref(null)
const promptContent = ref("");
const responseParts = ref([]);

mermaid.initialize({ startOnLoad: false });  // Initialize mermaid without auto-loading

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

const resizeTextarea = () => {
    const textarea = autoResizeTextArea.value;
    const divarea = autoResizeDiv.value;
    if (textarea.scrollHeight < 100) {
        divarea.style.height = 'auto';
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        divarea.style.height = `${textarea.scrollHeight + 20}px`;
    }
};
onMounted(resizeTextarea); // Resize textarea initially

const sendPrompt = async () => {
    isIconAnimated.value = true;
    responseParts.value = [];  // Reset parts array
    fetch('https://pundit-1e15.onrender.com/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: promptContent.value })
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
    const regex = /```mermaid\s+([\s\S]*?)\s+```/g;
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            parts.push({ type: 'text', content: content.substring(lastIndex, match.index) });
        }
        parts.push({ type: 'mermaid', content: match[1] });
        console.log(match[1]);
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
        parts.push({ type: 'text', content: content.substring(lastIndex) });
    }

    responseParts.value = parts;
    await renderMermaidDiagrams();
};

const renderMermaidDiagrams = async () => {
    await nextTick();
    // Render all diagrams with the 'mermaid' class in the DOM
    mermaid.run(undefined, '.mermaid-diagram');
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
    margin-top: 3rem;
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
    height: 3rem;
    border-radius: 0.4rem;
    border: solid 1px #130540;
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 0.5rem 1rem;
}

.prompt-input {
    outline: none;
    border: none;
    resize: none;
    font-size: 0.9rem;
    background-color: transparent;
    height: 2.5rem;
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
}
</style>
