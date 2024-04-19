<script setup lang="ts"></script>

<template>
  <div id="app">
    <el-container>
      <el-header> </el-header>
      <el-main id="main">
        <router-view />
      </el-main>
      <el-footer>
        <p>© 2023</p>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
#main {
  max-width: 1280px;
}
</style>
