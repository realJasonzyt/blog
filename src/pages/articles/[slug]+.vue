<script lang="ts">
import { getArticle, metaData } from '@/api'
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'

export const useArticle = defineBasicLoader('/articles/[slug]+', async (route) => {
  const { slug } = route.params
  if (slug.length > 1) {
    return null
  }
  const article = getArticle(slug[0])
  console.log(article)
  if (!article) {
    return null
  }
  return { article, content: await article.content.fetch() }
})
</script>

<script setup lang="ts">
const { data, isLoading, error, reload } = useArticle()

if (!data || error || !data.value?.article || !data.value?.content) {
  // useRouter().replace('/404')
}
</script>

<template>
  <div>
    <h1>{{ data?.article.title }}</h1>
    <p>{{ data?.content }}</p>
  </div>
</template>
