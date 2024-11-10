<script lang="ts" setup>
import GalleryCategory from '@/components/GalleryCategory.vue';
import { getCategories } from '@/scripts/gallery';
</script>

<template>
  <GalleryCategory v-for="c in getCategories()" :category="c"></GalleryCategory>
</template>