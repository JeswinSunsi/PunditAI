<!-- src/views/Login.vue -->
<template>
  <div>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { auth } from "../firebase"; // Make sure this path is correct
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter()

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Successfully signed in:", result.user);
    await router.push('/'); // Move this here - only redirect on success
  } catch (err) {
    console.error("Error signing in:", err);
  }
};

onMounted(() => { signInWithGoogle(); })
</script>

<style scoped></style>