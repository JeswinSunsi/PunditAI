<template>
  <div class="main">
    <h1 class="hero-heading">Answers that go the distance</h1>
    <h2 class="hero-subheading">Generate 10,000+ words from a single prompt, designed for thinkers & creators.
    </h2>
    <div class="flex-wrap-2">
      <div class="btn">
        <h1 class="btn-1">Try for free</h1>
      </div>
      <div class="btn">
        <h1 class="btn-2">View Pricing</h1>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.main {
  padding-top: 15vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Poppins;
}

.hero-heading {
  font-size: 3.5rem;
  font-weight: 800;
  color: #130540;
  text-align: center;
  line-height: 6rem;
}

.hero-subheading {
  font-size: 1.2rem;
  color: rgba(19, 5, 64, 0.8);
  text-align: center;
  width: 40vw;
  line-height: 1.5rem;
}

.flex-wrap-2 {
  display: flex;
}

.flex-wrap-2 div {
  margin-top: 5vh;
  padding: 0.6rem 1.3rem;
  cursor: pointer;
  margin-right: 0.6rem;
  border-radius: 0.3rem;
  background-color: #130540;
  color: #fff;
}

.flex-wrap-2 div:first-child {
  color: #130540;
  border: solid 1px #130540;
  background-color: #fff;
}
</style>