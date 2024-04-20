<script setup lang="ts">
import { ref } from 'vue'

const handleSelect = (index: number) => {
  console.log(index)
}

let itemClass = ref('hidden')
const handleMouseOver = () => {
  itemClass.value = 'show'
}
const handleMouseLeave = () => {
  itemClass.value = 'hidden'
}
</script>

<template>
  <el-menu
    class="navbar"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <el-menu-item class="avatar" index="0">
      <el-avatar>
        <img src="https://avatars.githubusercontent.com/u/66063199" />
      </el-avatar>
      <div class="title">Jasonzyt's Blog</div>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item class="item" :class="itemClass" index="1">相册</el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none;
}

.navbar {
  --el-menu-active-color: #409eff;
  --el-menu-hover-text-color: #409eff;
  --el-menu-text-color: #000;
  /* --el-menu-bg-color: #fff; */
  --el-menu-hover-bg-color: rgba(0, 0, 0, 0);
  padding: 0 1rem 0 1rem;
  width: 100vw;
  display: flex;
  position: fixed;
  border-bottom: 0;
  z-index: 9;
  transition:
    background-color 0.4s ease-in-out,
    box-shadow 0.4s ease-in-out;
}

.navbar:hover {
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.title {
  color: #000;
  margin-left: 1rem;
  font-family: 'Jetbrains Mono', sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
}

.item {
  font-size: 1.05rem;
  transition: opacity 0.4s ease-in-out;
}

.hidden {
  opacity: 0;
}

.show {
  opacity: 1;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 0;
}

.el-menu-item:hover {
  border-bottom: 10px #409eff !important;
}

.flex-grow {
  flex-grow: 1;
}
</style>
