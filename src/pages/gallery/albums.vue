<script lang="ts" setup>
import GalleryAlbum from '@/components/GalleryAlbum.vue';
import { getAlbums } from '@/scripts/gallery';
</script>

<template>
  <GalleryAlbum v-for="a in getAlbums()" :album="a" :id="a.id"></GalleryAlbum>
</template>