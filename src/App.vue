<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router/auto'

const router = useRouter()

let barPinned = ref(false)

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
    whenDownTo: document.documentElement.clientHeight * 0.8,
    action: NavBarAction.Unpin
  },
  '/gallery/': {
    whenDownTo: document.documentElement.clientHeight * 0.8,
    action: NavBarAction.Unpin
  },
  '/gallery/albums': {
    whenDownTo: document.documentElement.clientHeight * 0.8,
    action: NavBarAction.Unpin
  },
  '/gallery/categories': {
    whenDownTo: document.documentElement.clientHeight * 0.8,
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

<template>
  <NavBar @select="handleNavBarSelect" :pinned="barPinned" />
  <RouterView />
</template>

<style scoped></style>
