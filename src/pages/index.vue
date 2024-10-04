<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <TheWelcome />
  <div class="bg-placeholder" />
  <TheFooter />
</template>

<style scoped>
.bg-placeholder {
  display: block;
  height: 100vh;
}
</style>
