<script setup>
import Hero from '../components/hero.vue'
import Comparison from '../components/comparison.vue';
import TextBlock1 from '../components/textBlock1.vue';
import TextBlock2 from '../components/textBlock2.vue';
import Pricing from '../components/pricing.vue';
import Footer from '../components/footer.vue';

const vFadeIn = {
    mounted: (el) => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(20px)'
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.style.opacity = '1'
                    el.style.transform = 'translateY(0)'
                    observer.unobserve(el)
                }
            })
        }, {
            threshold: 0.3
        })
        observer.observe(el)
    }
}
</script>

<template>
    <div class="container">
        <Hero />
        <Comparison />
        <TextBlock2 v-fade-in />
        <Pricing v-fade-in />
        <TextBlock1 v-fade-in />
        <Footer />
    </div>
</template>

<style scoped></style>

<style>
@-webkit-keyframes bg-scrolling-reverse {
    100% {
        background-position: 50px 50px;
    }
}

@-moz-keyframes bg-scrolling-reverse {
    100% {
        background-position: 50px 50px;
    }
}

@-o-keyframes bg-scrolling-reverse {
    100% {
        background-position: 50px 50px;
    }
}

@keyframes bg-scrolling-reverse {
    100% {
        background-position: 50px 50px;
    }
}

@-webkit-keyframes bg-scrolling {
    0% {
        background-position: 50px 50px;
    }
}

@-moz-keyframes bg-scrolling {
    0% {
        background-position: 50px 50px;
    }
}

@-o-keyframes bg-scrolling {
    0% {
        background-position: 50px 50px;
    }
}

@keyframes bg-scrolling {
    0% {
        background-position: 50px 50px;
    }
}

body {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC") repeat 0 0;
    -webkit-animation: bg-scrolling-reverse 0.92s infinite;
    -moz-animation: bg-scrolling-reverse 0.92s infinite;
    -o-animation: bg-scrolling-reverse 0.92s infinite;
    animation: bg-scrolling-reverse 0.92s infinite;
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    -o-animation-timing-function: linear;
    animation-timing-function: linear;
}
</style>
