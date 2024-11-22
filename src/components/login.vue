<!-- src/views/Login.vue -->
<template>
  <div>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter()

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await router.push('/'); // only redirect on success
  } catch (err) {
    console.error("Error signing in:", err);
  }
};

const logOutFromGoogle = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    localStorage.clear();
    router.push('/');
    alert('Logged Out Successfully!');
  } catch (error) {
    console.error('Logout error:', error.message);
  }
};

const authenticate = () => {
  const auth = getAuth();
  if (auth.currentUser) {
    logOutFromGoogle()
  }
  else {
    signInWithGoogle()
  }
}

onMounted(() => { authenticate(); })
</script>

<style scoped></style>