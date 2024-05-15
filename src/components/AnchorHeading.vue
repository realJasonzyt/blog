<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  id: string
  tag: string
  heading: string
}>()

const href = `#${props.id}`

let anchorShow = ref(false)

const onAnchorClick = (e: Event) => {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="flex-container" @mouseover="anchorShow = true" @mouseleave="anchorShow = false">
    <a class="anchor" :href="href" :style="{ opacity: anchorShow ? '1' : '0' }" @click="onAnchorClick">
      <el-icon size="18px">
        <IconAnchorLink />
      </el-icon>
    </a>
    <component class="heading" :is="tag" :id="id">
      {{ heading }}
    </component>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
}

.heading {
  flex: 1;
  margin: 0 42px;
}

.anchor {
  display: block;
  margin: auto -30px;
  transition: opacity 0.3s ease-in-out;
}

.anchor .el-icon {
  color: #000;
}
</style>
