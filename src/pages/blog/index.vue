<script setup lang="ts">
import TheFooter from '~/components/my/Footer.vue';
import { ref } from 'vue';

const contents = queryContent("blog")

// TODO: autocomplete
// const onSelect = () => {
// }
// const fetchSuggestions = () => {
// };

let searchBarFocused = ref(false)
</script>

<template>
  <div class="main">
    <!-- <div class="search">
      <el-input placeholder="Search articles" size="large" clearable @change="onChange" @submit="onSearch"
        @focus="searchBarFocused = true" @blur="searchBarFocused = false"
        :style="{ boxShadow: searchBarFocused ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none' }">
        <template #prepend>
          <el-button @click="onSearch">
            <el-icon>
              <MyIcon name="Search" />
            </el-icon>
          </el-button>
        </template>
TODO: filter
<template #append>
          <el-icon>
            <MyIcon name="Filter" />
          </el-icon>
        </template>
</el-input>
</div> -->
    <BlogList :columns="1" />
  </div>
</template>

<style>
.el-input {
  --el-input-border-radius: 10px;
  border-radius: var(--el-input-border-radius);
}

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

@media screen and (max-width: 768px) {
  .main {
    padding: 100px 2rem 2rem;
  }
}
</style>