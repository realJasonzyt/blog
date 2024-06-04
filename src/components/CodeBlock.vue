<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  language: string
}>()

const emits = defineEmits<{ copy: [] }>()

let showButton = ref(false)
let showCheck = ref(false)

const onClick = () => {
  emits('copy')
  showCheck.value = true
}

const onMouseLeave = () => {
  setTimeout(() => {
    showCheck.value = false
  }, 2000)
}
</script>

<template>
  <div class="block" @mouseenter="showButton = true" @mouseleave="showButton = false">
    <slot></slot>
    <el-button v-show="showButton || showCheck" class="copy" type="info" @click="onClick" @mouseleave="onMouseLeave">
      <el-icon size="1.2rem" v-show="!showCheck">
        <IconCopy />
      </el-icon>
      <el-icon size="1.2rem" color="#1a7f37" v-show="showCheck">
        <IconLightCheck />
      </el-icon>
    </el-button>
    <span v-show="!showButton" class="lang">{{ language }}</span>
  </div>
</template>

<style scoped>
.block {
  position: relative;
  margin: 0;
  padding: 0;
}

.copy {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
}

.el-button {
  right: 0.2em;
  top: 0.2em;
  width: 3em;
  height: 3em;
  z-index: 2;
  background: #f5f5f5;
}

.el-button:hover {
  color: #409eff;
  background-color: #e0e0e0;
}

.lang {
  position: absolute;
  right: 1em;
  top: 0.5em;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: #666;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
