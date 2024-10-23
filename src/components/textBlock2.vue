<template>
    <div class="main">
        <div class="title">Comprehensive Answers, Simplified</div>
        <div class="subtitle">Transform a single prompt into <span style="font-weight: 600;"> comprehensive, creative,
                and data-rich
            </span>content. Unleash
            the power of AI to generate detailed reports, articles, and research in minutes. Whether you're a scholar or
            a content creator, elevate your writing with <span style="font-weight: 600;">unparalleled depth &
                accuracy.</span></div>
        <div class="flex-wrap-2">

            <div class="btn">
                <h1 class="btn-2">Explore Features</h1>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    font-family: Poppins;
    padding-left: 10vw;
    margin-top: 5rem;
}

.title {
    font-size: 2rem;
    width: 40vw;
    font-weight: 600;
    line-height: 2.5rem;
}

.subtitle {
    width: 50vw;
    line-height: 1.5rem;
    margin-top: 1rem;
}

.flex-wrap-2 {
    display: flex;
    margin-top: 1rem;
}

.flex-wrap-2 div {
    padding: 0.6rem 1.3rem;
    cursor: pointer;
    margin-right: 0.6rem;
    border-radius: 0.3rem;
    background-color: #130540;
    color: #fff;
}

@media only screen and (max-width: 600px) {
    .title {
        width: 80vw;
    }

    .subtitle {
        width: 80vw;
    }
}
</style>