<template>
  <NavMobileBar :items="items" :show="barPinned" />
  <ul class="navbar flex px-4 max-sm:hidden" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <li class="inline-flex px-4 justify-center items-center cursor-pointer" index="logo" @click="handleClick('')">
      <UAvatar class="inline-block mr-4" size="md" :src="$config.avatar" alt="avatar" />
      <Transition name="fade">
        <NavBarTitle :show="itemShow || barPinned">{{ $config.title }}</NavBarTitle>
      </Transition>
    </li>
    <div class="flex-grow" />
    <Transition name="fade" v-for="item in items">
      <NavBarItem :show="itemShow || barPinned" :index="item.index" :key="item.index" @click="handleClick">
        <Icon class="mr-2" :name="item.icon" />
        {{ item.text }}
      </NavBarItem>
    </Transition>
  </ul>
</template>

<script setup lang="ts">
import $config from '~/utils/_config'

const router = useRouter()

const items = [
  { index: 'blog', text: 'Blog', icon: 'i-my-feather' },
  { index: 'gallery', text: 'Gallery', icon: 'i-my-photo' },
  { index: 'about', text: 'About', icon: 'i-my-user' }
]

const barPinned = ref(false)

const itemShow = ref(barPinned.value)
const handleMouseOver = () => {
  itemShow.value = true
}
const handleMouseLeave = () => {
  itemShow.value = false
}

const handleClick = (index: string) => {
  router.push(`/${index}`)
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
  '/blog/:slug': {
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
.navbar {
  width: 100vw;
  height: 60px;
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
</style>
