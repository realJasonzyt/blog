<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router/auto'

const router = useRouter()

let barPinned = ref(false)

interface PinPageList {
  [key: string]: {
    pinWhenScrollDown: number
  }
}

const dynamicPinPageList: PinPageList = {
  '/': {
    pinWhenScrollDown: document.documentElement.clientHeight * 0.8
  },
  '/articles/:slug+': {
    pinWhenScrollDown: 300
  }
}

const refreshPin = (matches = router.currentRoute.value.matched) => {
  if (!matches || matches.length === 0) {
    return
  }
  const matched = matches[matches.length - 1]
  if (Object.keys(dynamicPinPageList).indexOf(matched.path) !== -1) {
    const { pinWhenScrollDown: pinWhenTopHeight } = dynamicPinPageList[matched.path]
    if (document.documentElement.scrollTop > pinWhenTopHeight) {
      barPinned.value = true
    } else {
      barPinned.value = false
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
