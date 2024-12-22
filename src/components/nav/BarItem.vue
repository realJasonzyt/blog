<template>
  <li class="item inline-flex justify-center items-center" :class="show ? 'show' : 'hidden'"
    :style="{ '--border-width': borderWidth }" :index="index" @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave" @click="$emit('click', index)">
    <slot></slot>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  show: Boolean,
  index: String
})

defineEmits(['click'])

let borderWidth = ref('0')

const handleMouseOver = () => {
  borderWidth.value = '90%'
}
const handleMouseLeave = () => {
  borderWidth.value = '0'
}
</script>

<style scoped>
.item {
  font-size: 1.05rem;
  margin-top: 1px !important;
  padding: 0 10px;
  color: #666;
  position: relative;
  cursor: pointer;
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

.item:hover {
  color: #409eff;
}
</style>