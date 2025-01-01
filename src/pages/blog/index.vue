<script setup lang="ts">
useHead({
  title: 'Blogs'
})

</script>

<template>
  <div class="main">
    <BlogList :columns="1" :sort="(a: ParsedBlog, b: ParsedBlog) => compareTime(a.created, b.created)" />
  </div>
</template>

<style>
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
  margin-bottom: 2rem;
}

.search-bar {
  transition: box-shadow 0.3s ease-in-out;
}

@media screen and (max-width: 768px) {
  .main {
    padding: 100px 2rem 2rem;
  }
}
</style>