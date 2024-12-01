<script lang="ts" setup>
import GalleryAlbum from '@/components/GalleryAlbum.vue';
import { getAlbums } from '@/utils/gallery';
</script>

<template>
  <!-- TODO: Sort albums by time -->
  <GalleryAlbum v-for="a in getAlbums()" :album="a" :id="a.id"></GalleryAlbum>
</template>