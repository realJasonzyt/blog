<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router/auto'

const router = useRouter()

let barPinned = ref(false)

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
  if (to.path === '/') {
    barPinned.value = false
  } else {
    barPinned.value = true
  }
  next()
})
</script>

<template>
  <NavBar :handle-select="handleNavBarSelect" :pinned="barPinned" />
  <RouterView />
</template>

<style scoped></style>
