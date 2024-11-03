<script setup lang="ts">
import GalleryPhoto from '@/components/GalleryPhoto.vue';
import HorizontalWaterfall from '@/components/HorizontalWaterfall.vue';
import { getPhotos, sortPhotosByDate } from '@/scripts/gallery';

</script>

<template>
  <HorizontalWaterfall :height="300">
    <GalleryPhoto v-for="p in sortPhotosByDate(getPhotos())" @click="() => { }" :photo="p"></GalleryPhoto>
  </HorizontalWaterfall>
</template>

<style scoped>
.photo-card {
  margin-right: 10px;
}
</style>