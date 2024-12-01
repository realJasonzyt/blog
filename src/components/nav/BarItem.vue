<template>
  <ElMenuItem class="item" :class="show ? 'show' : 'hidden'"
    :style="{ '--border-width': borderWidth, '--el-menu-active-color': textColor }" :index="index"
    @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <slot></slot>
  </ElMenuItem>
</template>

<script lang="ts" setup>
defineProps({
  show: Boolean,
  index: String
})

let borderWidth = ref('0')
let textColor = ref('#666')

const handleMouseOver = () => {
  borderWidth.value = '90%'
  textColor.value = '#409eff'
}
const handleMouseLeave = () => {
  borderWidth.value = '0'
  textColor.value = '#666'
}
</script>

<style scoped>
.item {
  font-size: 1.05rem;
  margin-top: 1px !important;
  padding: 0 10px;
  transition:
    border-bottom 0.4s ease-in-out,
    color 0.4s ease-in-out,
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