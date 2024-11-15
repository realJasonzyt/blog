<script lang="ts" setup>
import { Album } from '@/scripts/gallery';
import SquarePhoto from './SquarePhoto.vue';
import { onMounted, ref } from 'vue';

defineProps<{ album: Album }>()

let right = ref(0)

function calcAfterPhotos() {
  let albumCards = document.querySelectorAll('.album')
  if (albumCards.length == 0) {
    return
  }
  let width = albumCards[0].clientWidth
  right.value = (window.innerWidth - width) / 2 // padding
}

onMounted(calcAfterPhotos)
window.addEventListener('resize', calcAfterPhotos)

let expand = ref(false)

</script>

<template>
  <el-card class="album" shadow="hover" @click="expand = !expand">
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
    <div class="photos" v-show="!expand">
      <!-- TODO: href -->
      <SquarePhoto v-for="p in album.getPhotosByDate().slice(0, 10)" :photo="p" :size="128"></SquarePhoto>
    </div>
    <div class="expansion" v-show="expand">
      <el-row>
        <el-col v-for="p in album.getPhotosByDate()" :xs="6" :sm="6" :md="4" :lg="3" :xl="3">
          <SquarePhoto :photo="p" :size="128"></SquarePhoto>
        </el-col>
      </el-row>
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