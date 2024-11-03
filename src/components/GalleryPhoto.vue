<script setup lang="ts">
import type { Photo } from '@/scripts/gallery';
import { ref } from 'vue';

defineProps<{ photo: Photo }>()
defineEmits(['click'])

let showInfo = ref(false)

</script>

<template>
  <div class="photo-card" @click="$emit('click', photo)" @mouseenter="showInfo = true" @mouseleave="showInfo = false">
    <img :src="photo.url.s" :alt="photo.description" class="photo" />
    <div class="info" :style="{ opacity: showInfo ? 1 : 0 }">
      {{ photo.description }}
      <!-- <span class="album">
        <el-icon>
          <IconImage />
        </el-icon>
        {{ photo.album }}
      </span> -->
    </div>
  </div>
</template>

<style scoped>
.photo-card {
  height: 300px;
  display: inline-block;
  margin-bottom: 20px;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  border: 1px solid #eee;
  border-radius: 15px;
  transition: box-shadow 0.3s ease-in-out;
  z-index: -1;
  display: inline-block;
  overflow: hidden;
  position: relative;
}

.photo:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.info {
  text-align: right;
  padding: 0 10px 0 0;
  margin-top: -36px;
  border-radius: 15px;
  z-index: 1;
  border-top: none;
  color: #eee;
  transition: opacity 0.3s ease-in-out;
}
</style>