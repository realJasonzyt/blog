<script setup lang="ts">
import { onMounted, useTemplateRef, type ComponentPublicInstance } from 'vue';

const props = defineProps<{ height: number }>()

const waterfallRef = useTemplateRef('waterfall')

function doWaterfallize() {
  if (!waterfallRef.value) {
    console.error("waterfallRef not found")
  } else {
    const el = waterfallRef.value
    const gutter = 10
    const width = el.clientWidth
    const children = el.children

    let curLineWidth = 0
    let curLine = []
    let childrenWidths = []

    for (let i = 0; i < children.length; i++) {
      let child = children[i] as HTMLElement
      let w = child.clientWidth
      let h = child.clientHeight
      let w1 = (w * props.height / h)
      curLine.push(child)
      childrenWidths.push(w1)

      curLineWidth += w1 + gutter
      if (curLineWidth >= width) {
        for (let j = 0; j < curLine.length; j++) {
          let w = childrenWidths[j]
          let realContainerWidth = width - gutter * (j + 1)
          let calcWidth = w / curLineWidth * realContainerWidth
          curLine[j].style.width = calcWidth + 'px'
        }
        curLineWidth = 0
        curLine = []
        childrenWidths = []
      }
      // process the last line, if it is nearly full
      if (i === children.length - 1 && curLineWidth > 0.7 * width) {
        for (let j = 0; j < curLine.length; j++) {
          let w = childrenWidths[j]
          let realContainerWidth = width - gutter * (j + 1)
          let calcWidth = w / curLineWidth * realContainerWidth
          curLine[j].style.width = calcWidth + 'px'
        }
      }
    }
  }
}

window.addEventListener('resize', doWaterfallize)

onMounted(() => {
  setTimeout(doWaterfallize, 500)
})
</script>

<template>
  <div class="wf-main" ref="waterfall">
    <slot></slot>
  </div>
</template>