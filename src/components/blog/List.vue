<template>
  <div class="grid gap-4" :class="`grid-cols-${columns}`">
    <ContentList :query="query" v-slot="{ list }">
      <div v-for="(blog, index) in list" :key="blog.slug">
        <BlogListItem :blog="blog as ParsedBlog" :cover-pos="index % 2 != 0 ? 'left' : 'right'" />
      </div>
    </ContentList>
  </div>
</template>

<script lang="ts" setup>
import type { QueryBuilderParams } from '@nuxt/content'

defineProps({
  columns: {
    type: Number,
    default: 1
  },
  query: {
    type: Object,
    default: { path: '/blog' } as QueryBuilderParams
  }
})

</script>

<style scoped></style>