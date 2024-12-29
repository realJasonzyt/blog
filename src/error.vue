<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="main">
    <p class="statuscode text-gray text-[10rem]">{{ error?.statusCode }}</p>
    <p class="text-5xl text-gray">{{ error?.statusMessage }}</p>
    <NuxtLink to="/">
      <UButton class="mt-4">Go back to Home</UButton>
    </NuxtLink>
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
</style>
