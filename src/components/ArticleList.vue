<script setup lang="ts">
import ArticleListItem from '@/components/ArticleListItem.vue'
import type { Article } from '@/scripts/article';

const props = defineProps<{ articles: Article[] }>()

</script>

<template>
  <div class="list">
    <div v-for="(article, index) in articles" :key="article.slug" class="item">
      <RouterLink :to="`/articles/${article.slug}`">
        <ArticleListItem :article="article" :cover-pos="index % 2 == 0 ? 'left' : 'right'" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.list>div+div {
  margin-top: 2rem;
}
</style>