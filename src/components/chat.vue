<template>
    <div class="main">
        <div class="prompt-box" ref="autoResizeDiv">
            <textarea v-model="promptContent" class="prompt-input" placeholder="Ask Pundit AI" @input="resizeTextarea"
                ref="autoResizeTextArea"></textarea>
            <img src="../assets/write.gif" alt="enter" class="icon" v-show="isIconAnimated">
            <img src="../assets/write.png" alt="enter" class="icon" v-show="!isIconAnimated" @click="sendPrompt">
        </div>
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

@media only screen and (max-width: 600px) {
    .main {
        padding: 1rem 0rem;
    }

    .prompt-box {
        width: 85%;
    }

    .response-box {
        width: 80%;
    }
}
</style>
