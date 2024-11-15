<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router/auto';

let router = useRouter()
let viewMode = ref('')

viewMode.value = localStorage.getItem('gallery_viewMode') || ''

const handleChange = (v: string) => {
  localStorage.setItem('gallery_viewMode', v)
  router.push("/gallery/" + v)
}
</script>

<template>
  <div class="main">
    <!-- TODO: display mode: cards/list-->
    <el-radio-group v-model="viewMode" @change="handleChange" class="view-mode-radio">
      <el-radio-button label="Photo" value="" />
      <el-radio-button label="Album" value="albums" />
      <el-radio-button label="Category" value="categories" />
    </el-radio-group>
    <KeepAlive>
      <RouterView />
    </KeepAlive>
  </div>
</template>

<style scoped>
.main {
  padding: 100px;
  margin: 0 auto;
  max-width: 1400px;
}

.el-radio-group {
  margin-bottom: 20px;
}

.photo-card {
  margin-right: 10px;
}

@media screen and (max-width: 1000px) {
  .main {
    padding: 80px 20px;
  }
}
</style>