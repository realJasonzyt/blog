<template>
  <div class="grid gap-8" :class="`grid-cols-${columns}`">
    <div v-for="(blog, index) in list" :key="blog.slug">
      <BlogListItem :blog="blog as ParsedBlog" :cover-pos="index % 2 != 0 ? 'left' : 'right'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { QueryBuilderParams } from '@nuxt/content'

const props = defineProps({
  columns: {
    type: Number,
    default: 1
  },
  query: {
    type: Object,
    default: { path: '/blog' } as QueryBuilderParams
  },
  sort: {
    type: Function,
    default: (a: ParsedBlog, b: ParsedBlog) => { }
  }
})

const list = ref(await useAsyncData(() => queryContent(props.query).find()).then((res) => {
  if (!res.data.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      fatal: true
    })
  }
  return res.data.value as ParsedBlog[]
}))

list?.value?.sort((a: ParsedBlog, b: ParsedBlog) => props.sort(a, b))

</script>

<style scoped></style>