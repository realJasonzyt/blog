<script lang="ts" setup>
import $config from '~/utils/_config';

const props = defineProps<{ blog: ParsedBlog, coverPos: 'left' | 'right' }>()

const displayViews = ref('-')
// props.blog.fetchStringifiedViews().then(r => displayViews.value = r)

</script>

<template>
  <UCard class="transition-shadow hover:shadow-md" :ui="{ body: { padding: 'p-0 sm:p-0' } }">
    <div class="flex max-md:hidden" :class="coverPos == 'right' ? 'flex-row-reverse' : 'flex-row'">
      <div class="cover">
        <NuxtLink :to="`/blog/${blog.slug}`">
          <NuxtImg :src="blog.cover" alt="cover" loading="lazy" />
        </NuxtLink>
      </div>
      <div class="content">
        <div class="blog-content">
          <div class="header-and-info">
            <div class="header font-serif">
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
      </div>
    </div>
    <div class="md:hidden">
      <div class="w-full h-36 overflow-hidden">
        <NuxtLink :to="`/blog/${blog.slug}`">
          <NuxtImg class="size-full object-cover" :src="blog.cover" alt="cover" loading="lazy" />
        </NuxtLink>
      </div>
      <div class="px-4 pt-4">
        <div class="p-0 font-serif">
          <NuxtLink :to="`/blog/${blog.slug}`">
            <h1 dir="ltr">{{ blog.title }}</h1>
          </NuxtLink>
        </div>
        <div class="py-2 text-gray-600 text-[16px]">
          <span>
            <Icon name="ic:sharp-access-time-filled" class="text-sm mr-0.5" />
            <time :datetime="blog.created">
              {{ new Date(blog.created ?? '').toLocaleDateString() }}
            </time>
          </span>
          <span class="ml-1">
            <Icon name="ic:round-folder" class="text-sm mr-0.5" />
            <span>{{ blog.category }}</span>
          </span>
          <span class="ml-1" v-if="$config.api.blog.stats.enable">
            <Icon name="ic:round-local-fire-department" class="text-sm mr-0.5" />
            <span v-html="displayViews"></span>
          </span>
        </div>
      </div>
      <div class="px-4">
        <p>{{ blog.description }}</p>
      </div>
      <div class="px-4 py-0">
        <NuxtLink :to="`/blog/${blog.slug}`">
          <Icon name="ic:round-more-horiz" size="30px" />
        </NuxtLink>
      </div>
    </div>
  </UCard>
</template>

<style scoped>
.blog-content {
  height: 85%;
}

.more-btn {
  height: 15%;
  padding: 0 15px 10px 20px;
  text-align: v-bind('coverPos == "left" ? "right" : "left"');
}

.more-btn .iconify {
  color: rgb(var(--color-gray-700));
  transition: color 0.3s;
}

.more-btn .iconify:hover {
  color: rgb(var(--color-primary-500));
}

.cover {
  width: 50%;
  height: 280px;
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
  font-size: 0.8em;
  line-height: 2.5em;
}

.header h1 {
  color: rgb(var(--color-gray-800));
  margin-bottom: 10px;
  transition: color 0.3s;
}

.header h1:hover {
  color: rgb(var(--color-primary-500));
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
  color: rgb(var(--color-gray-600));
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
</style>