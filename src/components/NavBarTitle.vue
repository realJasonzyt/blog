<script setup lang="ts">
defineProps({
  show: Boolean
})
</script>

<template>
  <div class="title" :class="show ? 'show' : 'hidden'"><slot></slot></div>
</template>

<style scoped>
.title {
  color: #666;
  font-family: 'Jetbrains Mono', sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
  transition: opacity 0.4s ease-in-out;
}

.el-avatar + .title {
  margin-left: 1rem;
}
</style>
