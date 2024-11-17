<script lang="ts" setup>
import { Album } from '@/scripts/gallery';
import SquarePhoto from './SquarePhoto.vue';
import { onMounted, ref, useTemplateRef, type ComponentPublicInstance } from 'vue';

const props = defineProps<{ album: Album }>()

let squareSize = (window.innerWidth < 768 ? 64 : 128)
const right = ref(0)
const gutter = ref(10)
const expansionHeight = ref(squareSize)
let capacity = 5
let rowCount = 1
const albumRef = useTemplateRef<ComponentPublicInstance>('album')

function calculate() {
  squareSize = (window.innerWidth < 768 ? 64 : 128)
  if (!albumRef.value) {
    return
  }
  const el = albumRef.value.$el
  let width = el.clientWidth
  right.value = (window.innerWidth - width) / 2 // window padding
  const cardBody = el.children[0]
  width = cardBody.clientWidth
  let paddingLeft = cardBody.computedStyleMap().get('padding-left') as CSSUnitValue
  let paddingRight = cardBody.computedStyleMap().get('padding-right') as CSSUnitValue
  let innerPadding = paddingLeft.value + paddingRight.value
  capacity = Math.floor((width - innerPadding) / (squareSize + 5))
  gutter.value = Math.floor((width - innerPadding - capacity * squareSize) / (capacity - 1))
  rowCount = Math.ceil(props.album.getPhotos().length / capacity)
  expansionHeight.value = (squareSize + 10) * rowCount - 10
}

function setSideMargins(marginRight: number) {
  let thisPhotos = document.querySelector(`#${props.album.id} .photos`) as HTMLElement
  for (let i = 1; i <= rowCount; i++) {
    let idx = i * capacity - 1
    if (idx <= thisPhotos.children.length - 1) {
      let child = thisPhotos.children[idx] as HTMLElement
      child.style.marginRight = `${marginRight}px`
    }
  }
}

onMounted(calculate)
window.addEventListener('resize', calculate)

let expand = ref(false)
let wrap = ref(false)

const handleExpand = () => {
  expand.value = !expand.value
  if (wrap.value) {
    setTimeout(() => {
      setSideMargins(gutter.value)
      wrap.value = false
    }, 500)
  }
  else {
    setSideMargins(0)
    wrap.value = true
  }
}
</script>

<template>
  <el-card class="album" ref="album" shadow="hover" @click="handleExpand">
    <div class="header">
      <h1>{{ album.name }}</h1>
      <span class="description hidden-sm-and-down">{{ album.description }}</span>
      <div class="info">
        <span class="info-count">
          <el-icon :size="13">
            <IconImage />
          </el-icon>
          {{ album.getPhotos().length }} <span class="hidden-sm-and-down">photos</span>
        </span>
        <span class="time-period hidden-sm-and-down">
          <el-icon :size="13">
            <IconClock />
          </el-icon>
          {{ album.getTimePeriod() }}
        </span>
      </div>
    </div>
    <div class="photos">
      <!-- TODO: href -->
      <!-- TODO: load more -->
      <SquarePhoto v-for="p in album.getPhotosByDate().slice(0, 10)" :photo="p" :size="128"></SquarePhoto>
    </div>
  </el-card>
</template>

<style scoped>
.el-card {
  --el-card-border-radius: 15px;
  margin-bottom: 20px;
}

h1 {
  display: inline-block;
}

.header {
  margin-bottom: 10px;
}

.description {
  margin-left: 10px;
  font-size: 1rem;
  color: #666;
}

.album {
  width: 100%;
  padding: 0 10px;
}

.photos {
  white-space: v-bind('wrap ? "normal" : "nowrap"');
  transition: all 0.5s;
  max-height: v-bind('(expand ? expansionHeight : squareSize) + "px"');
}

.photos::after {
  content: '';
  position: absolute;
  right: v-bind(right + 'px');
  width: 100px;
  height: 128px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
  display: v-bind('expand ? "none" : "inline-block"');
}

.square-photo {
  margin-right: v-bind('gutter + "px"');
}

.info {
  float: right;
  margin-top: 10px;
}

.info span {
  color: #444;
  font-size: 1rem;
}

.time-period {
  margin-left: 10px;
}

.expansion .square-photo {
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .el-card {
    --el-card-padding: 12px;
  }

  .square-photo {
    width: 64px;
    height: 64px;
  }
}
</style>