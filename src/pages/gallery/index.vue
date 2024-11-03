<script setup lang="ts">
import GalleryPhoto from '@/components/GalleryPhoto.vue';
import HorizontalWaterfall from '@/components/HorizontalWaterfall.vue';
import { getPhotos } from '@/scripts/gallery';
import { ref } from 'vue';

const viewMode = ref('photo'); // photo or album
</script>

<template>
  <div class="main">
    <el-radio-group v-model="viewMode">
      <el-radio-button label="Photo" value="photo" />
      <el-radio-button label="Album" value="album" />
      <el-radio-button label="Category" value="category" />
    </el-radio-group>
    <HorizontalWaterfall :height="300">
      <GalleryPhoto v-for="p in getPhotos()" @click="() => { }" :photo="p"></GalleryPhoto>
    </HorizontalWaterfall>
  </div>
</template>

<style scoped>
.main {
  padding: 100px;
  margin: 0 auto;
  max-width: 1600px;
}

.el-radio-group {
  margin-bottom: 20px;
}

.photo-card {
  margin-right: 10px;
}
</style>