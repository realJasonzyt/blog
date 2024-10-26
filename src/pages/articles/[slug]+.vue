<script setup lang="ts">
import $config from '@/_config'
import { getArticle, getCategory } from '@/scripts/article'
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

const displayViews = ref('-')

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
          <span class="views" v-if="$config.api.stats.enable">
            <el-icon>
              <IconEye />
            </el-icon>
            <span v-html="displayViews"></span>
          </span>
        </div>
      </div>
      <div class="body">
        <Suspense @resolve="onResolve">
          <ArticleContent :slug="slug" />
        </Suspense>
        <div class="note">
          <p v-if="article?.updatedAt != article?.createdAt">
            Updated at {{ new Date(article?.updatedAt ?? '').toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<style>
.katex-html {
  display: none;
}

img {
  max-width: 100%;
}
</style>

<style scoped>
.main {
  padding: 150px 4rem 2rem;
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

.views {
  text-align: left;
  min-width: 3em;
}

.body {
  margin-top: 50px;
  padding-right: 2rem;
  padding-left: 2rem;
  font-size: 16px;
}

.note {
  margin-top: 2rem;
  color: #666;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .main {
    padding: 100px 2rem 2rem;
  }
}
</style>
