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
