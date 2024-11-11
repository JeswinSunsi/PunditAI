<!-- src/views/Login.vue -->
<template>
  <div>
    <button @click="signInWithGoogle" :disabled="loading">
      {{ loading ? 'Signing in...' : 'Sign in with Google' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "../firebase"; // Make sure this path is correct
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const loading = ref(false);
const error = ref(null);

const signInWithGoogle = async () => {
  loading.value = true;
  error.value = null;
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Successfully signed in:", result.user);
    // Handle successful sign in
  } catch (err) {
    console.error("Error signing in:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 1rem;
}
</style>