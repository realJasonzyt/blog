<script setup lang="ts">
import { onMounted } from 'vue';


const props = defineProps<{ height: number }>()

function doWaterfallize() {
  let mainDiv = document.querySelector('div.wf-main')
  if (!mainDiv) {
    console.log("failed to find main div")
  } else {
    let gutter = 10
    let width = mainDiv.clientWidth
    let children = mainDiv.children

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
  <div class="wf-main">
    <slot></slot>
  </div>
</template>