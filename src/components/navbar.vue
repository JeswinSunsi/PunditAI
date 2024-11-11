<template>
    <div class="main">
        <RouterLink to="/">
            <img src="../assets/logo.png" alt="Pundit AI">
        </RouterLink>
        <div class="flex-wrap-1" v-if="$route.name === 'Home'">
            <a href="#features">
                <div class="item">
                    <h1>Product</h1>
                    <img src="../assets/southArrow.png" alt="Navigate to Link">
                </div>
            </a>
            <a href="#product">
                <div class="item">
                    <h1>Features</h1>
                    <img src="../assets/southArrow.png" alt="Navigate to Link">
                </div>
            </a>
            <a href="#pricing">
                <div class="item">
                    <h1>Pricing</h1>
                    <img src="../assets/southArrow.png" alt="Navigate to Link">
                </div>
            </a>
            <a href="https://github.com/jeswinsunsi/punditai" target="_blank">
                <div class="item">
                    <h1>Github</h1>
                </div>
            </a>
        </div>

        <h1 class="chat-title flex-wrap-1" v-if="$route.name === 'Chat'">New Chat</h1>
        <div class="flex-wrap-2">
            <RouterLink to="/login">

                <div class="btn">
                    <h1 class="btn-1">Login</h1>
                </div>
            </RouterLink>
            <RouterLink to="/chat">
                <div class="btn" style="background-color: #130540; color: #fff;">
                    <h1 class="btn-2">Try for free</h1>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem 0.5rem 4rem;
    background-color: #fff;
    font-family: Poppins;
    font-weight: 400;
    color: #130540;
    position: sticky;
    z-index: 100;
    top: 0;
}

img {
    cursor: pointer;
    height: 2rem;
}

.chat-title {
    font-weight: 700;
    font-size: 1.2rem;
}

.flex-wrap-1 {
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.item {
    padding: 0rem 2rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item img {
    margin-left: 0.5rem;
    height: 1rem;
}

.flex-wrap-2 {
    display: flex;
}

.flex-wrap-2 div {
    padding: 0.6rem 1.3rem;
    cursor: pointer;
    margin-right: 0.6rem;
    border-radius: 0.3rem;
}

.flex-wrap-2 div:first-child {
    color: #130540;
    border: solid 1px #130540;
    background-color: #fff;
}

@media only screen and (max-width: 740px) {
    .flex-wrap-1 {
        display: none;
    }

    .main {
        padding: 1rem;
    }
}
</style>