<script lang="ts" setup>
import { Album } from '@/scripts/gallery';
import SquarePhoto from './SquarePhoto.vue';
import { onMounted, ref } from 'vue';

defineProps<{ album: Album }>()

let right = ref(0)

function calcAfterPhotos() {
  let albumCards = document.querySelectorAll('.album')
  for (let i = 0; i < albumCards.length; i++) {
    let width = albumCards[i].clientWidth
    right.value = (window.innerWidth - width) / 2 // padding
  }
}

onMounted(calcAfterPhotos)
window.addEventListener('resize', calcAfterPhotos)

</script>

<template>
  <el-card class="album">
    <div class="title">
      <h1>{{ album.name }}</h1>
      <span class="description">{{ album.description }}</span>
    </div>
    <div class="info">
      <span class="info-count">
        <el-icon :size="13">
          <IconImage />
        </el-icon>
        {{ album.getPhotos().length }} photos
      </span>
      <span class="time-period">
        <el-icon :size="13">
          <IconClock />
        </el-icon>
        {{ album.getTimePeriod() }}
      </span>
    </div>
    <div class="photos">
      <SquarePhoto v-for="p in album.getPhotosByDate().slice(0, 10)" :photo="p" :size="128"></SquarePhoto>
    </div>
  </el-card>
</template>

<style scoped>
.el-card {
  --el-card-border-radius: 15px;
}

h1 {
  display: inline-block;
}

.description {
  margin-left: 10px;
  font-size: 1rem;
  color: #666;
}

.album {
  height: 280px;
  width: 100%;
  padding: 0 10px;
}

.photos {
  white-space: nowrap;
}

.photos::after {
  content: '';
  position: absolute;
  right: v-bind(right + 'px');
  width: 100px;
  height: 128px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
}

.info {
  margin-bottom: 25px;
}

.info span {
  color: #444;
  font-size: 1rem;
}

.time-period {
  margin-left: 10px;
}
</style>