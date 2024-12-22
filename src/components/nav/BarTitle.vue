<template>
  <div class="title select-none" :class="show ? 'show' : 'hidden'">
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
  color: #666;
  font-family: 'Jetbrains Mono', sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
  transition: opacity 0.4s ease-in-out;
}
</style>