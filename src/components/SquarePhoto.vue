<script setup lang="ts">
import { Photo } from '@/utils/gallery';

defineProps<{ size: number, photo: Photo }>()

const emit = defineEmits(['click'])

</script>

<template>
  <div class="square-photo">
    <img :src="photo.url.squareThumbnail" :alt="photo.description" class="photo" @click="emit('click', photo)" />
  </div>
</template>

<style scoped>
.square-photo {
  width: v-bind(size + 'px');
  height: v-bind(size + 'px');
  margin-right: 10px;
  margin-bottom: 10px;
  display: inline-block;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
}
</style>
