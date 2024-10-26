<template>
    <div class="main">
        <div class="prompt-box" ref="autoResizeDiv">
            <textarea v-model="text" class="prompt-input" placeholder="Ask Pundit AI" @input="resizeTextarea"
                ref="autoResizeTextArea"></textarea>
            <img src="../assets/write.gif" alt="enter" class="icon" v-show="isIconAnimated" @click="sendPrompt">
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
const text = ref(""); // Stores the text
const responseText = ref(""); // To store the response from the fetch request
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

const sendPrompt = () => {
    fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: text.value })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            responseText.value = data.response.data;
        })
        .catch(error => console.error('Error:', error));
};

onMounted(resizeTextarea); // Initial resizing
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

.prompt-input {
    scrollbar-width: none;
}
</style>
