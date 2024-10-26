<script setup>
import Navbar from './components/navbar.vue'
import Chat from './components/chat.vue';

</script>

<template>
  <div class="container">
    <Navbar />
    <Chat />
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