<script lang="ts" setup>
import $config from '@/utils/_config';

const props = defineProps<{ blog: ParsedBlog, coverPos: 'left' | 'right' }>()

const displayViews = ref('-')
// props.blog.fetchStringifiedViews().then(r => displayViews.value = r)

</script>

<template>
  <el-card shadow="hover">
    <el-row :style="{ flexDirection: coverPos == 'right' ? 'row-reverse' : 'row' }">
      <el-col class="cover" :span="12">
        <!-- TODO: Lazy load img-->
        <NuxtLink :to="`/blog/${blog.slug}`">
          <img :src="blog.cover" />
        </NuxtLink>
      </el-col>
      <el-col class="content" :span="12">
        <div class="blog-content">
          <div class="header-and-info">
            <div class="header">
              <NuxtLink :to="`/blog/${blog.slug}`">
                <h1 dir="ltr">{{ blog.title }}</h1>
              </NuxtLink>
            </div>
            <div class="info" dir="ltr">
              <span class="date">
                <Icon name="ic:sharp-access-time-filled" />
                <time :datetime="blog.created">
                  {{ new Date(blog.created ?? '').toLocaleDateString() }}
                </time>
              </span>
              <span class="category">
                <Icon name="ic:round-folder" />
                <span>{{ blog.category }}</span>
              </span>
              <span class="views" v-if="$config.api.blog.stats.enable">
                <Icon name="ic:round-local-fire-department" />
                <span v-html="displayViews"></span>
              </span>
            </div>
          </div>
          <div class="preview" dir="ltr">
            <p dir="ltr">{{ blog.description }}</p>
          </div>
        </div>
        <div class="more-btn">
          <NuxtLink :to="`/blog/${blog.slug}`">
            <Icon name="ic:round-more-horiz" size="30px" />
          </NuxtLink>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.el-card {
  --el-card-padding: 0;
  --el-card-border-radius: 10px;
}

.blog-content {
  height: 85%;
}

.more-btn {
  height: 15%;
  padding: 0 15px 10px 20px;
  text-align: v-bind('coverPos == "left" ? "right" : "left"');
}

.more-btn .iconify {
  transition: color 0.3s;
}

.more-btn .iconify:hover {
  color: var(--el-color-primary);
}

.cover {
  width: 50%;
  height: 280px;
  object-fit: cover;
  overflow: hidden;
}

.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.cover img:hover {
  transform: scale(1.3) rotate(10deg);
}

.content {
  width: 50%;
}

.header {
  width: 80%;
  padding: 25px 0px 0px 25px;
  overflow-y: hidden;
  color: #111;
  font-size: 0.8em;
  line-height: 2.5em;
  font-family: 'Noto Serif', 'Noto Serif SC', serif;
}

.header h1 {
  color: #111;
  margin-bottom: 10px;
  transition: color 0.3s;
}

.header h1:hover {
  color: var(--el-color-primary);
}

.preview {
  padding: 0 25px;
}

.preview p {
  font-size: 1em;
  line-height: 1.8em;
}

.info {
  padding: 6px 25px;
  color: #555;
  font-size: 16px;
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
  .header {
    padding: 12px 18px;
  }

  .header h1 {
    font-size: 1.5rem;
  }

  .info {
    font-size: 13px;
    padding: 14px 18px;
  }
}
</style>