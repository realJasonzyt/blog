<template>
  <div class="img-container">
    <img ref="img" :src="refinedSrc" :alt="props.alt" :width="props.width" :height="props.height" />
    <p v-if="props.alt">{{ props.alt }}</p>
  </div>
</template>

<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  },
  align: {
    type: String,
    default: 'center'
  }
})

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})

const imgRef = useTemplateRef('img')
const imgActualWidth = ref('100%')

onMounted(() => {
  if (!imgRef.value) {
    throw new Error('img not found')
  }
  imgRef.value.onload = () => {
    imgActualWidth.value = imgRef.value?.clientWidth + 'px'
  }
})

</script>

<style scoped>
.img-container {
  text-align: v-bind('props.align');
  width: 100%;
}

.img-container p {
  font-size: 0.8rem;
  text-align: center;
  display: inline-block;
  color: #888;
  width: v-bind('imgActualWidth');
}
</style>