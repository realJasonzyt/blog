<script lang="ts" setup>
import $config from '@/utils/_config';
import type { ParsedContent } from '@nuxt/content';

defineProps<{ blog: ParsedContent, coverPos: 'left' | 'right' }>()

const displayViews = ref('-')
// props.blog.fetchStringifiedViews().then(r => displayViews.value = r)

</script>

<template>
  <el-card shadow="hover">
    <el-row :dir="coverPos == 'right' ? 'rtl' : 'ltr'">
      <!-- TODO: Lazy load img-->
      <img class="cover" :src="blog.cover" />
      <div class="blog" :style="{ 'text-align': coverPos }">
        <div class=" title">
          <h1 dir="ltr">{{ blog.title }}</h1>
        </div>
        <!-- TODO: Show brief-->
        <div class="info" dir="ltr">
          <span class="date">
            <Icon name="ic:sharp-access-time-filled" />
            <time :datetime="blog?.created">
              {{ new Date(blog?.created ?? '').toLocaleDateString() }}
            </time>
          </span>
          <span class="category">
            <Icon name="ic:round-folder" />
            <span>{{ blog?.category }}</span>
          </span>
          <span class="views" v-if="$config.api.blog.stats.enable">
            <Icon name="ic:round-local-fire-department" />
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

.blog {
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
  ;
}

.info span,
.info time {
  display: inline-block;
}

.info .iconify {
  vertical-align: text-top;
}

.info .iconify+time,
.info .iconify+span {
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