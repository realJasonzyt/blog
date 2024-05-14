<script setup lang="ts">
import { getArticle } from '@/api'
import ArticleContent from '@/components/ArticleContent.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
if (!route.params.slug || !route.params.slug[0]) {
  console.error('Invalid slug')
}
const slug = route.params.slug[0]
const article = getArticle(slug)
</script>

<template>
  <div class="cover">
    <img class="hidden-xs-only" :src="article?.cover" alt="cover" />
  </div>
  <div class="main">
    <div class="header">
      <h1>{{ article?.title }}</h1>
    </div>
    <div class="body">
      <Suspense>
        <ArticleContent :slug="slug" />
      </Suspense>
    </div>
  </div>
</template>

<style>
.katex-html {
  display: none;
}
</style>

<style scoped>
.cover {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover::after {
  content: '';
  display: block;
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 0) 85%,
    rgba(255, 255, 255, 1) 100%
  );
}

.main {
  padding: 150px 2rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  position: relative;
  padding: 20px;
  text-align: center;
  z-index: 5;
}

.header h1 {
  font-size: 4rem;
  color: #fff;
  margin: 0;
}

.body {
  padding: 20px 2rem;
}
</style>
