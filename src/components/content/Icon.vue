<template>
  <Icon :name="name" :size="size" :style="style" />
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
  },
  size: {
    type: String,
    default: '24px'
  },
  style: {
    type: Object,
    default: {}
  }
})
</script>