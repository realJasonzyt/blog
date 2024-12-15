<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
import 'assets/css/main.scss'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Jasonzyt's Campu-site` : "Jasonzyt's Campu-site";
  }
})
</script>