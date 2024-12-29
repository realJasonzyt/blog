<script setup lang="ts">
import $config from '@/utils/_config'

</script>

<template>
  <ContentDoc v-slot="{ doc }">
    <div class="cover" :style="{ backgroundImage: `url(${doc?.cover})` }"></div>
    <div class="main">
      <div class="relative p-5">
        <h1 class="m-0 text-[2rem] text-white">{{ doc.title }}</h1>
        <div class="info mt-2 text-lg text-white">
          <span class="date">
            <Icon name="ic:sharp-access-time-filled" />
            <time :datetime="doc?.created">{{ new Date(doc?.created ?? '').toLocaleDateString() }}</time>
          </span>
          <span class="category">
            <!-- TODO: link to category -->
            <Icon name="ic:round-folder" />
            <span>{{ doc?.category }}</span>
          </span>
          <span class="text-left min-w-10" v-if="$config.api.blog.stats.enable">
            <Icon name="ic:round-local-fire-department" />
            <!-- TODO: views -->
            <span v-html="123"></span>
          </span>
        </div>
      </div>
      <div class="article-body mt-14 px-2 text-[16px] md:px-8">
        <ContentRenderer :value="doc" />
        <div class="mt-8 text-sm text-gray-600">
          <p v-if="doc?.updated != doc?.created">
            Updated at {{ new Date(doc?.updated ?? '').toLocaleDateString() }}
          </p>
        </div>
      </div>
    </div>
  </ContentDoc>
</template>

<style>
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

.article-body a {
  color: inherit;
}

.article-body p a {
  color: rgb(var(--color-primary-500));
  text-decoration: none;
  transition: 0.5s color;
}

.article-body p a:hover {
  color: rgb(var(--color-primary-700));
}

code {
  overflow-wrap: break-word;
}
</style>

<style scoped>
.main {
  padding: 375px 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.cover {
  position: absolute;
  width: 100%;
  height: 500px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
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
  .cover {
    height: 400px;
  }

  .main {
    padding: 250px 20px 2rem;
  }

  .header h1 {
    height: 4.8rem;
    font-size: 1.5rem;
  }
}
</style>
