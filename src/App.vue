<script setup>
import Hero from './components/hero.vue'
import Navbar from './components/navbar.vue';
import Comparison from './components/comparison.vue';
import Template1 from './components/template1.vue';
import Template2 from './components/template2.vue';
import Pricing from './components/pricing.vue';
import Footer from './components/footer.vue';


</script>

<template>
  <div class="container">
    <Navbar />
    <Hero />
    <Comparison />
    <Template2 />
    <Pricing />
    <Template1 />
    <Footer />
  </div>
</template>

<style>
html,
body {
  height: 100%;
  width: 100%;
  background-color: #FBFAFE;
}
</style>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
