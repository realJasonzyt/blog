<script setup lang="ts">
import $config from '@/utils/_config'

</script>

<template>
  <ContentDoc v-slot="{ doc }">
    <div class="cover" :style="{ backgroundImage: `url(${doc?.cover})` }"></div>
    <div class="main">
      <div class="header">
        <h1>{{ doc.title }}</h1>
        <div class="info">
          <span class="date">
            <Icon name="ic:sharp-access-time-filled" />
            <time :datetime="doc?.created">{{ new Date(doc?.created ?? '').toLocaleDateString() }}</time>
          </span>
          <span class="category">
            <!-- TODO: link to category -->
            <Icon name="ic:round-folder" />
            <span>{{ doc?.category }}</span>
          </span>
          <span class="views" v-if="$config.api.blog.stats.enable">
            <Icon name="ic:round-local-fire-department" />
            <!-- TODO: views -->
            <span v-html="123"></span>
          </span>
        </div>
      </div>
      <div class="article-body">
        <ContentRenderer :value="doc" />
        <div class="note">
          <p v-if="doc?.updated != doc?.created">
            Updated at {{ new Date(doc?.updated ?? '').toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>
  </ContentDoc>
</template>

<style>
.katex-html {
  display: none;
}

img {
  max-width: 100%;
}

.article-body h1 {
  margin-top: 20px;
  font-weight: bold;
}

.article-body h2,
.article-body h3 {
  margin-top: 10px;
  font-weight: bold;
}

.article-body h1 a,
.article-body h2 a,
.article-body h3 a,
.article-body h4 a,
.article-body h5 a,
.article-body h6 a {
  font-weight: bold;
}

.article-body p {
  margin-bottom: 8px;
}

.article-body li p {
  margin-bottom: 4px;
}

.article-body ul,
.article-body ol {
  margin-bottom: 10px;
}

.article-body code {
  font-size: 0.85em;
}

.article-body a {
  color: #303133
}

.article-body p a {
  color: #409eff;
  text-decoration: none;
  transition: 0.5s color;
}

.article-body p a:hover {
  color: #005fb1;
}

code {
  overflow-wrap: anywhere;
}
</style>

<style scoped>
.main {
  padding: 375px 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  position: relative;
  padding: 20px;
}

.cover {
  position: absolute;
  width: 100%;
  height: 500px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.header h1 {
  font-size: 2rem;
  margin: 0;
  color: #fff;
  text-shadow: #666 2px 2px 10px;
}

.info {
  margin-top: 0.5rem;
  color: #fff;
  font-size: 18px;
  text-shadow: #666 2px 2px 10px;
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

.views {
  text-align: left;
  min-width: 3em;
}

.article-body {
  margin-top: 50px;
  padding: 0 2rem;
  font-size: 16px;
}

.note {
  margin-top: 2rem;
  color: #666;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .cover {
    height: 400px;
  }

  .main {
    padding: 250px 20px 2rem;
  }

  .article-body {
    padding: 0 10px;
  }

  .header h1 {
    height: 4.8rem;
    font-size: 1.5rem;
  }
}
</style>
