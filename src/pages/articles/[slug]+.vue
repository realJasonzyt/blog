<script setup lang="ts">
import { getArticle } from '@/api'
import ArticleContent from '@/components/ArticleContent.vue'
import TheFooter from '@/components/TheFooter.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
if (!route.params.slug || !route.params.slug[0]) {
  console.error('Invalid slug')
}
const slug = route.params.slug[0]
const article = getArticle(slug)

const show = ref(false)
const onResolve = () => {
  show.value = true
}
</script>

<template>
  <div v-show="show">
    <div class="main">
      <div class="header">
        <h1>{{ article?.title }}</h1>
      </div>
      <div class="body">
        <Suspense @resolve="onResolve">
          <ArticleContent :slug="slug" />
        </Suspense>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<style>
.katex-html {
  display: none;
}
</style>

<style scoped>
.main {
  padding: 150px 2rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  position: relative;
  padding: 20px;
  text-align: center;
}

.header h1 {
  font-size: 3rem;
  margin: 0;
}

.body {
  margin-top: 50px;
  padding: 20px 2rem;
}
</style>
