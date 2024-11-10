<script setup lang="ts">
import ArticleListItem from '@/components/ArticleListItem.vue'
import type { Article } from '@/scripts/article';

const props = defineProps<{ articles: Article[], columns: number }>()

</script>

<template>
  <el-row class="list" :gutter="10">
    <el-col v-for="(article, index) in articles" :key="article.slug" class="item" :span="24 / columns">
      <RouterLink :to="`/articles/${article.slug}`">
        <ArticleListItem :article="article" :cover-pos="index % 2 == 0 ? 'left' : 'right'" />
      </RouterLink>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>