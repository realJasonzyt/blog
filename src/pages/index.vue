<script setup lang="ts">
useHead({
  title: null
})

const pinnedShowTitles: Ref<boolean[]> = ref([])

const handleMouseEnter = (index: number) => {
  if (isTouchScreen()) {
    return
  }
  pinnedShowTitles.value[index] = true
}

const handleMouseLeave = (index: number) => {
  if (isTouchScreen()) {
    return
  }
  pinnedShowTitles.value[index] = false
}

const pinnedBlogs = await useAsyncData(() => queryContent('blog').where({ pinned: { $gt: 0 } }).sort({ pinned: 1 }).find()).then(
  (res) => {
    pinnedShowTitles.value.fill(isTouchScreen(), 0, res.data.value?.length)
    return res.data.value
  })
</script>

<template>
  <MyWelcome />
  <div class="main">
    <section class="mb-8" id="pinned">
      <h2 class="mb-4 font-bold text-xl text-gray-600">
        <Icon class="align-text-top" name="my:anchor" size="20px" />
        Pinned
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink v-for="(blog, index) in pinnedBlogs" :to="blog._path">
          <div
            class="flex relative items-center h-52 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-500"
            @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave(index)">
            <NuxtImg class="size-full object-cover hover:scale-125 transition-transform duration-500" :src="blog.cover"
              alt="cover" />
            <Transition name="fade">
              <div
                class="absolute flex justify-center items-center text-center w-full h-24 p-4 bg-black bg-opacity-60 text-white text-xl font-medium font-sans"
                v-show="pinnedShowTitles.at(index) ?? isTouchScreen()">
                {{ blog.title }}
              </div>
            </Transition>
          </div>
        </NuxtLink>
      </div>
      <!-- <el-row :gutter="20">
        <el-col v-for="a in pinnedArticles" :key="a.slug" :span="8" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <RouterLink :to="`/articles/${a.slug}`">
            <el-card class="pinned-card" :style="{ backgroundImage: `url(${a.cover})` }"
              @mouseenter="handleMouseEnter(a)" @mouseleave="handleMouseLeave(a)">
              <Transition name="fade">
                <div class="title" v-show="a.show.value">
                  <h1>{{ a.title }}</h1>
                </div>
              </Transition>
            </el-card>
          </RouterLink>
        </el-col>
      </el-row> -->
    </section>
    <!-- <section class="recent">
      <h2>
        <el-icon :size="20">
          <IconNews />
        </el-icon>
        Recent
      </h2>
      <ArticleList :articles="recentArticles" :columns="2" />
    </section> -->
  </div>
</template>

<style scoped>
.main {
  padding: 75px;
  margin: 0 auto;
  max-width: 1200px;
}

.title {
  width: 100%;
  height: 80px;
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
  margin-bottom: 20px;
}

.article-card {
  --el-card-border-radius: 15px;
  --el-card-padding: 0;
  height: 150px;
}

@media screen and (max-width: 1000px) {
  .main {
    padding: 40px 40px;
  }

  .pinned-card {
    height: 150px;
  }

  .title {
    margin-top: 34px;
  }
}
</style>
