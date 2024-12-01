<script lang="ts" setup>
import { Category } from '@/utils/gallery';
import SquarePhoto from './SquarePhoto.vue';
import { onMounted, ref } from 'vue';

defineProps<{ category: Category }>()

let right = ref(0)

function calcAfterPhotos() {
  let categoryCards = document.querySelectorAll('.category')
  for (let i = 0; i < categoryCards.length; i++) {
    let width = categoryCards[i].clientWidth
    right.value = (window.innerWidth - width) / 2 // padding
  }
}

onMounted(calcAfterPhotos)
window.addEventListener('resize', calcAfterPhotos)

// TODO: REWRTIE
</script>

<template>
  <el-card class="category" shadow="hover">
    <div class="header">
      <h1>{{ category.name }}</h1>
      <span class="description hidden-md-and-down">{{ category.description }}</span>
      <div class="info">
        <span class="info-count">
          <el-icon :size="13">
            <MyIcon name="Image" />
          </el-icon>
          {{ category.getPhotos().length }} <span class="hidden-md-and-down">photos</span>
        </span>
      </div>
    </div>
    <div class="photos">
      <SquarePhoto v-for="p in category.getPhotosByDate().slice(0, 10)" :photo="p" :size="128"></SquarePhoto>
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

.category {
  height: 240px;
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

@media screen and (max-width: 768px) {
  .el-card {
    --el-card-padding: 12px;
  }

  .category {
    height: 160px;
  }

  .square-photo {
    width: 64px;
    height: 64px;
  }
}
</style>