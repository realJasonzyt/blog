<script lang="ts">
import { getArticle } from '@/api'
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'
import markdownIt from 'markdown-it'
import markdownItKatex from '@vscode/markdown-it-katex'

export const useArticle = defineBasicLoader('/articles/[slug]+', async (route) => {
  const { slug } = route.params
  if (slug.length > 1) {
    return null
  }
  const article = getArticle(slug[0])
  if (!article) {
    return null
  }
  const response = await article.content.fetch()
  const text = await response.text()
  const md = markdownIt()
  md.use(markdownItKatex)
  const content = md.render(text)
  return {
    article,
    content: content
  }
})
</script>

<script setup lang="ts">
const { data } = useArticle()
</script>

<template>
  <div class="cover hidden-xs-only">
    <img :src="data?.article.cover" alt="cover" />
  </div>
  <div>
    <h1>{{ data?.article.title }}</h1>
    <div v-html="data?.content"></div>
  </div>
</template>

<style>
.katex-html {
  display: none;
}
</style>
