<template>
    <div class="main">
        <img src="../assets/logo.png" alt="Pundit AI">
        <div class="flex-wrap-1">
            <div class="item">
                <h1>Product</h1>
                <img src="../assets/southArrow.png" alt="Navigate to Link">
            </div>
            <div class="item">
                <h1>Features</h1>
                <img src="../assets/southArrow.png" alt="Navigate to Link">
            </div>
            <div class="item">
                <h1>Pricing</h1>
                <img src="../assets/southArrow.png" alt="Navigate to Link">
            </div>
            <div class="item">
                <h1>Github</h1>
            </div>
        </div>
        <div class="flex-wrap-2">
            <div class="btn">
                <h1 class="btn-1">Login</h1>
            </div>
            <div class="btn">
                <h1 class="btn-2">Try for free</h1>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
img {
    cursor: pointer;
    height: 2rem;
}

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
    background-color: #130540;
    color: #fff;
}

.flex-wrap-2 div:first-child {
    color: #130540;
    border: solid 1px #130540;
    background-color: #fff;
}

@media only screen and (max-width: 600px) {
    .flex-wrap-2 div:first-child {}

    .flex-wrap-1 {
        display: none;
    }

    .main {
        padding: 1rem;
    }
}
</style>