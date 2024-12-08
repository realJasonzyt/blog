<template>
  <el-row class="list" :gutter="10">
    <ContentList path="/blog" v-slot="{ list }">
      <el-col v-for="(blog, index) in list" :key="blog.slug" class="item" :span="24 / columns">
        <BlogListItem :blog="blog as ParsedBlog" :cover-pos="index % 2 != 0 ? 'left' : 'right'" />
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