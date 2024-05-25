<script setup lang="ts">
import { getArticle, getCategory } from '@/api'
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
const category = getCategory(article?.category)

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
        <div class="info">
          <span class="date">
            <el-icon>
              <IconClock />
            </el-icon>
            <time :datetime="article?.createdAt">{{ new Date(article?.createdAt ?? '').toLocaleDateString() }}</time>
          </span>
          <span class="category">
            <el-icon>
              <IconFolder />
            </el-icon>
            <span>{{ article?.category }}</span>
          </span>
        </div>
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

.info {
  margin-top: 1rem;
  color: #666;
  font-size: 18px;
}

.info span,
.info time {
  display: inline-block;
}

.info .el-icon {
  vertical-align: middle;
}

.info .el-icon+time,
.info .el-icon+span {
  margin-left: 4px;
}

.info span+span {
  margin-left: 1rem;
}

.category span {
  transition: color 0.3s;
}

.category span:hover {
  color: v-bind("category?.color");
}

.body {
  margin-top: 50px;
  padding: auto 2rem;
  font-size: 16px;
}
</style>
