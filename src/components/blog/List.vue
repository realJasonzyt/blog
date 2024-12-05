<template>
  <el-row class="list" :gutter="10">
    <ContentList path="/blog" v-slot="{ list }">
      <el-col v-for="(blog, index) in list" :key="blog.slug" class="item" :span="24 / columns">
        <RouterLink :to="`/blog/${blog.slug}`">
          <BlogListItem :blog="blog" :cover-pos="index % 2 == 0 ? 'left' : 'right'" />
        </RouterLink>
      </el-col>
    </ContentList>
  </el-row>
</template>

<script lang="ts">
export default {
  props: {
    columns: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
</style>