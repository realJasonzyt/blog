<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import TheFooter from '@/components/TheFooter.vue'
import { getArticle } from '@/scripts/article';
import { ref } from 'vue';

const pinnedArticleNames = [
  'hello-world',
  'test2',
  'hello-world'
]

const pinnedArticles = pinnedArticleNames.map(name => {
  let a = getArticle(name)
  if (!a) {
    throw new Error(`article ${name} not found`)
  }
  return { ...a, show: ref(false) }
})
</script>

<template>
  <TheWelcome />
  <div class="main">
    <h2>
      <el-icon :size="20">
        <IconAnchor />
      </el-icon>
      Pinned
    </h2>
    <el-row :gutter="20" class="pinned">
      <el-col v-for="a in pinnedArticles" :key="a.slug" :span="8">
        <RouterLink :to="`/articles/${a.slug}`">
          <el-card class="pinned-card" :style="{ backgroundImage: `url(${a.cover})` }" @mouseenter="a.show.value = true"
            @mouseleave="a.show.value = false">
            <Transition name="fade">
              <div class="title" v-show="a.show.value">
                <h1>{{ a.title }}</h1>
              </div>
            </Transition>
          </el-card>
        </RouterLink>
      </el-col>
    </el-row>
  </div>
  <TheFooter />
</template>

<style scoped>
.main {
  padding: 75px;
  margin: 0 auto;
  max-width: 1200px;
}

h2 {
  font-weight: bold;
  margin-bottom: 10px;
  color: #444;
  font-size: 24px;
}

a {
  text-decoration: none;
}

.title {
  width: 100%;
  height: 80px;
  margin-top: 55px;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.title h1 {
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  width: 100%;
}

.pinned-card {
  --el-card-border-radius: 15px;
  --el-card-padding: 0;
  height: 200px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
