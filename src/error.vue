<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="main">
    <p class="statuscode">{{ error?.statusCode }}</p>
    <p class="status">{{ error?.statusMessage }}</p>
    <NuxtLink to="/"><el-button class="back-btn">Go back to Home</el-button></NuxtLink>
  </div>
  <!-- TODO: Suggest random photo in gallery -->
  <MyFooter />
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
