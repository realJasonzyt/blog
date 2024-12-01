<template>
  <i v-html="icon" class="el-icon"></i>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '1em'
    },
    color: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const icon = computed(() => IconSvgMap[props.name as keyof typeof IconSvgMap])
    return {
      icon
    }
  }
}
</script>

<style scoped>
i {
  width: v-bind('size')
}
</style>