<script lang="ts" setup>
import { Album } from '@/scripts/gallery';
import SquarePhoto from './SquarePhoto.vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{ album: Album }>()

const squareSize = (window.innerWidth < 768 ? 64 : 128)
let right = ref(0)
let gutter = ref(10)
let expansionHeight = ref(squareSize)

function calculate() {
  let albumCards = document.querySelectorAll('.album')
  if (albumCards.length == 0) {
    return
  }
  let width = albumCards[0].clientWidth
  right.value = (window.innerWidth - width) / 2 // window padding

  let albumCardBodies = document.querySelectorAll('.el-card__body')
  width = albumCardBodies[0].clientWidth
  let paddingLeft = albumCardBodies[0].computedStyleMap().get('padding-left') as CSSUnitValue
  let paddingRight = albumCardBodies[0].computedStyleMap().get('padding-right') as CSSUnitValue
  let innerPadding = paddingLeft.value + paddingRight.value
  let capacity = Math.floor((width - innerPadding) / (squareSize + 5))
  gutter.value = Math.floor((width - innerPadding - capacity * squareSize) / capacity)
  let rowCount = Math.ceil(props.album.getPhotos().length / capacity)
  expansionHeight.value = (squareSize + 10) * rowCount - 10
}

onMounted(calculate)
window.addEventListener('resize', calculate)

let expand = ref(false)
let wrap = ref(false)

const handleExpand = () => {
  expand.value = !expand.value
  if (wrap.value) {
    setTimeout(() => wrap.value = false, 500)
  }
  else {
    wrap.value = true
  }
}

</script>

<template>
  <el-card class="album" shadow="hover" @click="handleExpand">
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