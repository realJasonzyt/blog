<script setup lang="ts">
import TheFooter from '@/components/TheFooter.vue';
import { getArticles, searchArticles, utils } from '@/api';
import { ref } from 'vue';
import $config from '@/_config'


const articles = getArticles();
const currentArticles = ref(articles.slice(0, 10));
const pageCount = Math.ceil(articles.length / 10);
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
  const keywords = utils.parseKeywords(searchVal)
  console.log(keywords)
  const res = searchArticles(keywords)
  console.log(res)
};

// TODO: autocomplete
// const onSelect = () => {
// }
// const fetchSuggestions = () => {
// };
</script>

<template>
  <div class="main">
    <div class="search">
      <el-input placeholder="Search articles" size="large" clearable @change="onChange" @submit="onSearch">
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
    <div class="list">
      <div v-for="(article, index) in currentArticles" :key="article.slug" class="item">
        <router-link :to="`/articles/${article.slug}`" class="router-link">
          <el-card shadow="hover">
            <el-row :dir="index % 2 ? 'rtl' : 'ltr'">
              <div class="cover" :style="{ 'background-image': `url('${article.cover}')` }" />
              <div class="article">
                <div class="title">
                  <h1>{{ article.title }}</h1>
                </div>
                <div class="info" dir="ltr" :style="{ 'text-align': index % 2 ? 'right' : 'left' }">
                  <span class="date">
                    <el-icon>
                      <IconClock />
                    </el-icon>
                    <time :datetime="article?.createdAt">{{ new Date(article?.createdAt ?? '').toLocaleDateString()
                      }}</time>
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
                    <span v-html="displayViews[index]"></span>
                  </span>
                </div>
              </div>
            </el-row>
          </el-card>
        </router-link>
      </div>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="pageCount" @change="onPageChange" />
    </div>
  </div>
  <TheFooter />
</template>

<style>
.el-input {
  --el-input-border-radius: 10px;
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
}

.list {
  margin: 2rem 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.el-card {
  --el-card-padding: 0;
  --el-card-border-radius: 10px;
}

.el-pagination {
  --el-pagination-border-radius: 5px;
}

.list>div+div {
  margin-top: 2rem;
}

.cover {
  width: 40%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.article {
  width: 60%;
}

.title {
  height: 75%;
  padding: 12px 25px;
  overflow-y: hidden;
}

.info {
  height: 25%;
  padding: 8px 25px;
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

a {
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  .main {
    padding: 100px 2rem 2rem;
  }

  .title {
    padding: 12px 18px;
  }

  .title h1 {
    font-size: x-large;
  }

  .info {
    font-size: 13px;
    padding: 8px 18px;
  }
}
</style>