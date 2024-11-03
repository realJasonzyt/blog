<script setup lang="ts">
import GalleryPhoto from '@/components/GalleryPhoto.vue';
import HorizontalWaterfall from '@/components/HorizontalWaterfall.vue';
import { getPhotos } from '@/scripts/gallery';

</script>

<template>
  <HorizontalWaterfall :height="300">
    <GalleryPhoto v-for="p in getPhotos()" @click="() => { }" :photo="p"></GalleryPhoto>
  </HorizontalWaterfall>
</template>

<style scoped>
.photo-card {
  margin-right: 10px;
}
</style>