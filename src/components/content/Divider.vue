<template>
  <UDivider :ui="ui">
    <slot />
  </UDivider>
</template>

<script lang="ts" setup>
defineProps({
  ui: {
    type: Object,
    default: {}
  },
  size: {
    type: String,
    default: 'sm'
  }
})
</script>