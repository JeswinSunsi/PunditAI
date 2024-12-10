<template>
    <div class="main" id="product">
        <div class="title">From Prompt to Pages in Seconds</div>
        <div class="subtitles">
            <div class="subtitle">Instantaneous Response <span style="font-weight: 700; font-size: 1.2rem;">·</span>
            </div>
            <div class="subtitle">Directly download generated reports & documents <span
                    style="font-weight: 700; font-size: 1.2rem;">·</span></div>
            <div class="subtitle">Flexible pricing <span style="font-weight: 700; font-size: 1.2rem;">·</span>
            </div>
        </div>
        <div class="flex-wrap-2">

            <div class="btn">
                <h1 class="btn-2">Back Home</h1>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.main {
    display: flex;
    align-items: end;
    flex-direction: column;
    font-family: Poppins;
    padding-right: 10vw;
    margin-top: 5rem;
}

.title {
    font-size: 2rem;
    width: 40vw;
    text-align: right;
    font-weight: 600;
    line-height: 2.5rem;
}

.subtitle {
    text-align: right;
    width: 50vw;
    line-height: 1.5rem;
    margin-top: 0.7rem;
}

.flex-wrap-2 {
    display: flex;
    margin-top: 1.5rem;
    margin-right: -0.7rem;
}

.flex-wrap-2 div {
    padding: 0.6rem 1.3rem;
    cursor: pointer;
    margin-right: 0.6rem;
    border-radius: 0.3rem;
    background-color: #130540;
    color: #fff;
}

@media only screen and (max-width: 740px) {
    .title {
        width: 80vw;
    }

    .subtitle {
        width: 80vw;
    }
}
</style>