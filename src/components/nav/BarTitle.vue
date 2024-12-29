<template>
  <div class="title select-none font-mono font-bold text-lg" :class="show ? 'show' : 'hidden'">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  show: Boolean
})
</script>

<style scoped>
.title {
  color: rgb(var(--color-gray-600));
  transition: opacity 0.4s ease-in-out;
}
</style>