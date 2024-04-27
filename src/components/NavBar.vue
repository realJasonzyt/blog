<script setup lang="ts">
import { ref } from 'vue'
import NavBarItem from './NavBarItem.vue'
import NavBarTitle from './NavBarTitle.vue'

const handleSelect = async (index: any) => {
  switch (index) {
    case '0':
      window.location.href = '/'
      break
    case '1':
      window.location.href = '/gallery'
      break
  }
}

let barPinned = false
let itemShow = ref(false)
const handleMouseOver = () => {
  if (!barPinned) {
    itemShow.value = true
  }
}
const handleMouseLeave = () => {
  if (!barPinned) {
    itemShow.value = false
  }
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
      <NavBarTitle :show="itemShow">Jasonzyt's Blog</NavBarTitle>
    </el-menu-item>
    <div class="flex-grow" />
    <NavBarItem :show="itemShow" :index="'1'">
      <el-icon>
        <IconCamera />
      </el-icon>
      Gallery
    </NavBarItem>
  </el-menu>
</template>

<style scoped>
.el-menu {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none;
}

.navbar {
  --el-menu-active-color: #666;
  --el-menu-hover-text-color: #409eff;
  --el-menu-text-color: #666;
  /* --el-menu-bg-color: #fff; */
  --el-menu-hover-bg-color: rgba(0, 0, 0, 0);
  --el-menu-border-color: rgba(0, 0, 0, 0);
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

.el-menu--horizontal > .el-menu-item,
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 0;
}

.flex-grow {
  flex-grow: 1;
}
</style>
