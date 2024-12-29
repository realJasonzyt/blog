<template>
  <div class="relative">
    <div class="code-block font-mono flex" ref="block" @mouseenter="showButton = true" @mouseleave="showButton = false">
      <div class="flex-none w-16 text-right text-md text-gray-600">
        <div class="line-no pr-6 flex" :class="highlights.includes(i) ? 'highlight' : ''" v-for="i in lineCount"
          :key="i">
          <div class="line-mark flex-none w-[3px] h-[1.6rem]" />
          <span class="flex-1 pl-4">{{ i }}</span>
        </div>
      </div>
      <pre ref="pre" class="p-0 m-0 flex-auto" :class="$props.class"><slot /></pre>
      <div class="info">
        <UButton v-show="showButton || showCheck" class="copy" color="gray" variant="solid" size="lg" square
          @click="onClick" @mouseleave="onMouseLeave">
          <Icon name="ic:round-content-copy" size="1.2rem" v-show="!showCheck" />
          <Icon name="uil:check" size="1.2rem" style="color: #1a7f37" v-show="showCheck" />
        </UButton>
        <span v-if="filename == null" v-show="!showButton" class="lang">{{ language }}</span>
        <span v-if="filename != null" v-show="!showButton" class="filename">{{ filename }}</span>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})

const lineCount = computed(() => {
  return props.code.split('\n').length
})

const showButton = ref(false)
const showCheck = ref(false)

const onClick = () => {
  navigator.clipboard.writeText(props.code)
  showCheck.value = true
}

const onMouseLeave = () => {
  setTimeout(() => {
    showCheck.value = false
  }, 2000)
}

const preRef = useTemplateRef('pre')

onMounted(() => {
  if (!preRef.value) {
    throw new Error('pre not found')
  }
  for (let i = 0; i < props.highlights.length; i++) {
    preRef.value.querySelector(`span.line[line="${props.highlights[i]}]"`)?.classList.add('highlight');
  }
})
</script>

<style>
.highlight {
  background-color: rgba(var(--color-primary-200) / 0.6) !important;
}

.line {
  display: block;
  line-height: 1.6rem;
}
</style>

<style scoped>
.code-block {
  background-color: rgb(var(--color-gray-100));
  border-radius: 5px;
  margin: 1em 0;
  padding: 0.8em 0;
  overflow: auto;
}

.highlight .line-mark {
  background-color: rgb(var(--color-primary-500))
}

.info {
  position: absolute;
  right: 1rem;
  cursor: pointer;
}

.lang,
.filename {
  position: absolute;
  right: 0;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: rgb(var(--color-gray-600));
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.lang {
  text-transform: uppercase;
}
</style>
