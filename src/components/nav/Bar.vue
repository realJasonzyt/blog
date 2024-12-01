<template>
  <NavMobileBar :items="items" :show="barPinned" @select="handleNavBarSelect" />
  <el-menu class="navbar hidden-xs-only" mode="horizontal" :ellipsis="false" @select="handleNavBarSelect"
    @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <el-menu-item class="avatar" index="logo">
      <el-avatar>
        <img :src="$config.avatar" />
      </el-avatar>
      <NavBarTitle :show="itemShow || barPinned">{{ $config.title }}</NavBarTitle>
    </el-menu-item>
    <div class="flex-grow" />
    <NavBarItem v-for="item in items" :show="itemShow || barPinned" :index="item.index" :key="item.index">
      <MyIcon :name="item.icon" />
      {{ item.text }}
    </NavBarItem>
  </el-menu>
</template>

<script setup lang="ts">
import $config from '@/utils/_config'

const router = useRouter()

const items = [
  { index: 'articles', text: 'Articles', icon: 'Feather' },
  { index: 'gallery', text: 'Gallery', icon: 'Image' },
  { index: 'about', text: 'About', icon: 'User' }
]

const barPinned = ref(false)

const itemShow = ref(barPinned)
function handleMouseOver() {
  if (!barPinned) {
    itemShow.value = true
  }
}
const handleMouseLeave = () => {
  if (!barPinned) {
    itemShow.value = false
  }
}


enum NavBarAction {
  Pin = 1,
  Unpin = 0
}

interface NavBarActionList {
  [key: string]: {
    whenDownTo: number
    action: NavBarAction
  }
}

const barActionList: NavBarActionList = {
  '/': {
    whenDownTo: document.documentElement.clientHeight * 0.8,
    action: NavBarAction.Pin
  },
  '/gallery': {
    whenDownTo: document.documentElement.clientHeight * 0.5,
    action: NavBarAction.Unpin
  },
  '/gallery/': {
    whenDownTo: document.documentElement.clientHeight * 0.5,
    action: NavBarAction.Unpin
  },
  '/gallery/albums': {
    whenDownTo: document.documentElement.clientHeight * 0.5,
    action: NavBarAction.Unpin
  },
  '/gallery/categories': {
    whenDownTo: document.documentElement.clientHeight * 0.5,
    action: NavBarAction.Unpin
  },
  '/about': {
    whenDownTo: document.documentElement.clientHeight * 0.3,
    action: NavBarAction.Pin
  },
  '/articles/:slug+': {
    whenDownTo: document.documentElement.clientHeight * 0.3,
    action: NavBarAction.Unpin
  }
}

const refreshPin = (matches = router.currentRoute.value.matched) => {
  if (!matches || matches.length === 0) {
    return
  }
  const matched = matches[matches.length - 1]
  if (Object.keys(barActionList).indexOf(matched.path) !== -1) {
    const { whenDownTo, action } = barActionList[matched.path]
    if (document.documentElement.scrollTop > whenDownTo) {
      barPinned.value = action === NavBarAction.Pin
    } else {
      barPinned.value = action === NavBarAction.Unpin
    }
  } else {
    barPinned.value = true
  }
}

const handleNavBarSelect = (index: string) => {
  switch (index) {
    case 'home':
      router.push('/')
      break
    case 'logo':
      router.push('/')
      break
    case 'articles':
      router.push('/articles')
      break
    case 'gallery':
      let viewModeRecord = localStorage.getItem('gallery_viewMode') ?? ''
      localStorage.setItem('gallery_viewMode', viewModeRecord)
      router.push('/gallery/' + viewModeRecord)
      break;
    case 'about':
      barPinned.value = false
      router.push('/about')
      break
    default:
      break
  }
}

router.beforeEach((to, _from, next) => {
  refreshPin(to.matched)
  next()
})

setInterval(() => {
  refreshPin()
}, 200)
refreshPin()
</script>

<style scoped>
.el-menu {
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
  position: fixed;
  border-bottom: 0;
  background-color: v-bind("itemShow || barPinned ? '#fff' : 'rgba(0, 0, 0, 0)'");
  box-shadow: v-bind("barPinned ? '0 0 10px 0 rgba(0, 0, 0, 0.1)' : 'none'");
  z-index: 9;
  transition:
    background-color 0.4s ease-in-out,
    box-shadow 0.4s ease-in-out;
}

.navbar:hover {
  background-color: #fff;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2) !important;
}

.el-menu--horizontal>.el-menu-item,
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: 0;
}
</style>
