<template>
    <div class="main">
        Made with ☕ & 💖 by <a href="https://github.com/jeswinsunsi" target="_blank">Team Meltdowm</a>
    </div>
</template>

<script setup>

</script>

<style scoped>
.main {
    margin-top: 3rem;
    width: 100%;
    height: 7rem;
    background-color: #FFF;
    border-top: solid 1px rgba(19, 5, 64, 0.8);
    font-family: Poppins;
    display: flex;
    justify-content: center;
    align-items: center;
}

a {
    color: #42CF71 !important;
    text-decoration: underline;
    color: rgb(19, 5, 64);
    cursor: pointer;
    font-weight: 600;
    margin-right: 0.3rem;
    margin-left: 0.3rem;
}

@media only screen and (max-width: 740px) {
    a {
        font-size: 0.8rem;
    }
}
</style>