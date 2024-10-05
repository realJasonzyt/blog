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
  '/about': {
    whenDownTo: document.documentElement.clientHeight * 0.8,
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
    case 'about':
      barPinned.value = false
      router.push('/about')
    default:
      break
  }
}

router.beforeEach((to, from, next) => {
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
