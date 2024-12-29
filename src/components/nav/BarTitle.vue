<template>
  <div class="title select-none font-mono text-[22px]" :class="show ? 'show' : 'hidden'">
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
  font-weight: bold;
  transition: opacity 0.4s ease-in-out;
}
</style>