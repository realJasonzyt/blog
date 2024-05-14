<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  language: string
}>()

defineEmits<{ copy: [] }>()

let showButton = ref(false)
</script>

<template>
  <div class="block" @mouseenter="showButton = true" @mouseleave="showButton = false">
    <slot></slot>
    <Transition name="fade">
      <el-button v-show="showButton" class="copy" type="info" @click="$emit('copy')">
        <el-icon size="1.2rem"><IconCopy /></el-icon>
      </el-button>
    </Transition>
    <Transition name="fade">
      <span v-show="!showButton" class="lang">{{ language }}</span>
    </Transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
