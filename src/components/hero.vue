<template>
  <div class="main">
    <h1 class="hero-heading">Answers that <span style="cursor: pointer;">go</span> the distance </h1>
    <h2 class="hero-subheading">Generate 10,000+ words from a single prompt, designed for thinkers & creators.
    </h2>
    <div class="flex-wrap-2">
      <div class="btn">
        <RouterLink to="/chat">
          <h1 class="btn-1">Try for free</h1>
        </RouterLink>
      </div>
      <div class="btn">
        <a href="#pricing">
          <h1 class="btn-2">View Pricing</h1>
        </a>
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
  font-size: 4.5rem;
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
  line-height: 2.5rem;
}

.flex-wrap-2 {
  display: flex;
}

.flex-wrap-2 div {
  margin-top: 5vh;
  padding: 1.2rem 1.7rem;
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

@media only screen and (max-width: 740px) {
  .hero-heading {
    font-size: 2.5rem;
    padding: 0rem 1rem;
    line-height: 3rem;
    margin-bottom: 2rem;
  }

  .hero-subheading {
    font-size: 1.2rem;
    color: rgba(19, 5, 64, 0.8);
    text-align: center;
    width: 90vw;
    line-height: 1.5rem;
  }
}
</style>