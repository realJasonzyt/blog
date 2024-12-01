<script setup lang="ts">
import TheFooter from '~/components/my/Footer.vue';
</script>
<template>
  <div class="main">
    <p class="statuscode">404</p>
    <p class="status">Not Found</p>
    <RouterLink to="/"><el-button class="back-btn">Go back to Home</el-button></RouterLink>
  </div>
  <!-- TODO: Suggest random photo in gallery -->
  <TheFooter />
</template>

<style scoped>
.main {
  padding: 2rem;
  height: 100vh;
  text-align: center;
}

.statuscode {
  font-size: 10rem;
  font-family: 'Ubuntu', serif;
  color: #333;
}

.status {
  font-size: 3rem;
  color: #444;
}

.back-btn {
  margin-top: 1rem;
}
</style>
