<template>
    <div class="main">
        <div class="prompt-box" ref="autoResizeDiv">
            <textarea v-model="text" class="prompt-input custom-scrollbar" placeholder="Ask Pundit AI"
                @input="resizeTextarea" ref="autoResizeTextArea"></textarea>
            <img src="../assets/write.gif" alt="enter" class="icon" v-show="isIconAnimated"
                @click="isIconAnimated = !isIconAnimated">
            <img src="../assets/write.png" alt="enter" class="icon" v-show="!isIconAnimated"
                @click="isIconAnimated = !isIconAnimated">
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

let isIconAnimated = ref(false);

const text = ref(""); // Stores the text
const autoResizeTextArea = ref(null);
const autoResizeDiv = ref(null)

const resizeTextarea = () => {
    const textarea = autoResizeTextArea.value;
    const divarea = autoResizeDiv.value
    if (textarea.scrollHeight < 100) {
        divarea.style.height = 'auto';
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height
        divarea.style.height = `${textarea.scrollHeight + 20}px`; // Adjust height
    }
};

// Ensure initial resizing if there's initial content
onMounted(resizeTextarea);
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

.icon {
    height: 1.7rem;
    margin-top: 0.5rem;
    cursor: pointer;
}

.prompt-box {
    width: 30rem;
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
    height: 2.5rem;
    width: 25rem;
    font-family: Poppins;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 1px;
    /* Adjust thickness */
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    /* Track color */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: red;
    border-radius: 10px;
}

/* Custom Scrollbar for Firefox */
.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;
}
</style>