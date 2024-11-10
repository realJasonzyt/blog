<script setup lang="ts">
import TheFooter from '@/components/TheFooter.vue';
import ArticleList from '@/components/ArticleList.vue';
import { getArticles, searchArticles } from '@/scripts/article';
import { ref } from 'vue';
import $config from '@/_config'
import { parseKeywords } from '@/scripts/util'


const articles = getArticles();
const currentArticles = ref(articles.slice(0, 10));
const displayViews = new Array(10);

const onPageChange = (curPage: number, size: number) => {
  if (curPage > size) {
    return;
  }
  const start = (curPage - 1) * 10;
  const end = start + 10;
  if (start >= articles.length) {
    return;
  }
  currentArticles.value = articles.slice(start, end);
};

let searchVal = ''
const onChange = (_oldVal: string, newVal: string) => {
  searchVal = newVal
}

const onSearch = () => {
  console.log(searchVal)
  const keywords = parseKeywords(searchVal)
  console.log(keywords)
  const res = searchArticles(keywords)
  console.log(res)
};

// TODO: autocomplete
// const onSelect = () => {
// }
// const fetchSuggestions = () => {
// };

let searchBarFocused = ref(false)
</script>

<template>
  <div class="main">
    <div class="search">
      <el-input placeholder="Search articles" size="large" clearable @change="onChange" @submit="onSearch"
        @focus="searchBarFocused = true" @blur="searchBarFocused = false"
        :style="{ boxShadow: searchBarFocused ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none' }">
        <template #prepend>
          <el-button @click="onSearch">
            <el-icon>
              <IconSearch />
            </el-icon>
          </el-button>
        </template>
        <!-- TODO: filter
        <template #append>
          <el-icon>
            <IconFilter />
          </el-icon>
        </template> -->
      </el-input>
    </div>
    <ArticleList :articles="currentArticles"></ArticleList>
  </div>
  <TheFooter />
</template>

<style>
.el-input {
  --el-input-border-radius: 10px;
  border-radius: var(--el-input-border-radius);
}

@media screen and (min-width: 1000px) {
  .el-input {
    width: 600px;
  }
}
</style>

<style scoped>
.main {
  padding: 100px 6rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.search {
  width: 100%;
  height: 4rem;
  text-align: center;
  margin-bottom: 2rem;
}

@media screen and (max-width: 768px) {
  .main {
    padding: 100px 2rem 2rem;
  }
}
</style>