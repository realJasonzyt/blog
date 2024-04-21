<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  show: Boolean,
  index: String
})

let borderWidth = ref('0')

const handleMouseOver = () => {
  borderWidth.value = '100%'
}
const handleMouseLeave = () => {
  borderWidth.value = '0'
}
</script>

<template>
  <el-menu-item
    class="item"
    :class="show ? 'show' : 'hidden'"
    :style="{ '--border-width': borderWidth }"
    :index="index"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
    ><slot></slot
  ></el-menu-item>
</template>

<style scoped>
.item {
  font-size: 1.05rem;
  transition:
    border-bottom 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
}

.item::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  height: 5px;
  background-color: #409eff;
  width: 100%;
  max-width: var(--border-width, 0);
  transition: max-width 0.25s ease-in-out;
  box-sizing: inherit;
}
</style>
