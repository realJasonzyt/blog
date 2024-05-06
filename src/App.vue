<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router/auto'

const router = useRouter()

let barPinned = ref(false)

const refreshPin = (path: string = router.currentRoute.value.path) => {
  if (path === '/') {
    if (document.documentElement.scrollTop > document.documentElement.clientHeight * 0.8) {
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
  refreshPin(to.path)
  next()
})

setInterval(() => {
  refreshPin()
}, 50)
refreshPin()
</script>

<template>
  <NavBar @select="handleNavBarSelect" :pinned="barPinned" />
  <RouterView />
</template>

<style scoped></style>
