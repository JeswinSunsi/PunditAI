<script setup>
import Navbar from './components/navbar.vue'
</script>

<template>
  <div class="container">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped></style>

<style>
html,
body {
  height: 100%;
  width: 100%;
  background-color: #FBFAFE;
}

html {
  scroll-padding-top: 5rem;
  scroll-behavior: smooth;
  overflow-y: scroll;
}
</style>