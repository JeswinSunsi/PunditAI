<template>
    <div class="main">
        <div class="prompt-box" ref="autoResizeDiv">
            <textarea v-model="promptContent" class="prompt-input" placeholder="Ask Pundit AI" @input="resizeTextarea"
                ref="autoResizeTextArea"></textarea>
            <img src="../assets/write.gif" alt="enter" class="icon" v-show="isIconAnimated">
            <img src="../assets/write.png" alt="enter" class="icon" v-show="!isIconAnimated" @click="sendPrompt">
        </div>
        <span class="placeholder-content fade-into-view" ref="placeholderContent" v-if="isPlaceholderVisible">
            <h1 class="placeholder-title">Hi, what can I help you with?</h1>
            <div class="placeholder-idea" @click="promptContent = 'Generate an essay on the evolution of LLMs'">Generate
                an
                essay on the evolution of LLMs</div>
            <div class="placeholder-idea"
                @click="promptContent = 'Produce a report on the current geopolitical landscape'">Produce a report on
                the current geopolitical landscape</div>
            <div class="placeholder-idea"
                @click="promptContent = 'Write an article about the history of medieval trade routes between Asia & Europe'">
                Write an article about the history of medieval trade routes between Asia &
                Europe
            </div>
        </span>
        <div class="response-box" v-if="responseText">
            <p v-html="responseText">
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

let isIconAnimated = ref(false);
const promptContent = ref("");
const responseText = ref("");
const autoResizeTextArea = ref(null);
const autoResizeDiv = ref(null)
const isPlaceholderVisible = ref(true)

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

const sendPrompt = async () => {
    isIconAnimated.value = true;
    responseText.value = null
    fetch('https://pundit-1e15.onrender.com/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: promptContent.value })
    })
        .then(response => {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let result = '';
            isPlaceholderVisible.value = false;
            const readStream = () => {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        isIconAnimated.value = false;
                        return;
                    }

                    result += decoder.decode(value, { stream: true });
                    responseText.value = result;
                    readStream();
                });
            };

            readStream();
        })
        .catch(error => { console.error('Error:', error); isIconAnimated.value = false; });
};


const placeholderContent = ref(null)

onMounted(() => {
    setTimeout(() => {
        placeholderContent.value.style.opacity = '1'
    }, 1)
})


onMounted(resizeTextarea); // Reize textarea initially
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

.icon {
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
}
</style>
