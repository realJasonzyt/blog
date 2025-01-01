<template>
  <div class="title select-none font-mono font-bold text-lg" :class="show ? 'show' : 'hidden'">
    <slot></slot>
    <span class="ml-2 text-sm text-gray-600 align-text-bottom">(Under Construction)</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  show: Boolean
})
</script>

<style scoped>
.title {
  color: rgb(var(--color-gray-700));
  transition: opacity 0.4s ease-in-out;
}
</style>