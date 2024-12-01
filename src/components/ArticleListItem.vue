<script lang="ts" setup>
import { Article } from '@/utils/article'
import $config from '@/utils/_config'
import { ref } from 'vue'

const props = defineProps<{ article: Article, coverPos: 'left' | 'right' }>()

const displayViews = ref('-')
props.article.fetchStringifiedViews().then(r => displayViews.value = r)

</script>

<template>
  <el-card shadow="hover">
    <el-row :dir="coverPos == 'right' ? 'rtl' : 'ltr'">
      <!-- TODO: Lazy load img-->
      <img class="cover" :src="article.cover" />
      <div class="article">
        <div class="title">
          <h1>{{ article.title }}</h1>
        </div>
        <!-- TODO: Show brief-->
        <div class="info" dir="ltr" :style="{ 'text-align': coverPos }">
          <span class="date">
            <el-icon>
              <MyIcon name="Clock" />
            </el-icon>
            <time :datetime="article?.createdAt">{{ new Date(article?.createdAt ?? '').toLocaleDateString()
              }}</time>
          </span>
          <span class="category">
            <el-icon>
              <MyIcon name="Folder" />
            </el-icon>
            <span>{{ article?.category }}</span>
          </span>
          <span class="views" v-if="$config.api.articles.stats.enable">
            <el-icon>
              <MyIcon name="Eye" />
            </el-icon>
            <span v-html="displayViews"></span>
          </span>
        </div>
      </div>
    </el-row>
  </el-card>
</template>

<style scoped>
.el-card {
  --el-card-padding: 0;
  --el-card-border-radius: 10px;
}

.cover {
  width: 40%;
  height: 200px;
  object-fit: cover;
  overflow: hidden;
}

.article {
  width: 60%;
}

.title {
  height: 75%;
  padding: 15px 25px;
  overflow-y: hidden;
}

.info {
  height: 25%;
  padding: 6px 25px;
  color: #555;
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

@media screen and (max-width: 768px) {
  .title {
    padding: 12px 18px;
  }

  .title h1 {
    font-size: 1.5rem;
  }

  .info {
    font-size: 13px;
    padding: 14px 18px;
  }
}
</style>