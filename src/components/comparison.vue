<template>
    <div class="main">
        <ImgComparisonSlider :hover="true" class="slider">
            <!-- eslint-disable -->

            <figure slot="first" class="before">
                <img width="100%" src="../assets/pundit.png" alt="Existing LLMs">
                <figcaption>Existing LLMs</figcaption>
            </figure>
            <figure slot="second" class="after">
                <img width="100%" src="../assets/gemini.png" alt="With Pundit AI">
                <figcaption>With Pundit AI</figcaption>
            </figure>
            <!-- eslint-enable -->
        </ImgComparisonSlider>
    </div>
</template>

<script>
import { ImgComparisonSlider } from '@img-comparison-slider/vue';

export default {
    name: 'Comparisont',
    components: {
        ImgComparisonSlider,
    },
};
</script>

<style scoped>
.main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
}


.slider {
    margin-top: 1rem;
    width: 60%;
    border-radius: 0.5rem;
    box-shadow: 0px -1px 26px -7px rgba(0, 0, 0, 1);
    -webkit-box-shadow: 0px -1px 26px -7px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0px -1px 26px -7px rgba(0, 0, 0, 1);
}

.before,
.after {
    font-family: Poppins;
    font-weight: 400;
    font-size: 0.7rem;
}

.before figcaption,
.after figcaption {
    background: #fff;
    border-radius: 0.5rem;
    color: #130540;
    opacity: 0.9;
    padding: 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    line-height: 100%;
}

.before figcaption {
    left: 12px;
}

.after figcaption {
    right: 12px;
}

@media only screen and (max-width: 740px) {
    .slider {
        width: 90%;
        outline: none;
    }
}
</style>