<template>
  <div class="social">
    <NuxtLink class="mx-4" v-for="social in socialList" :key="social.website" :to="social.url" target="_blank">
      <Icon :name="social.icon" mode="svg" :size="size" :style="social.style" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: String
  },
  tone: {
    type: String,
    default: 'black'
  }
});

const socialList = [
  {
    icon: 'uil:github',
    style: 'color: ' + props.tone,
    website: 'GitHub',
    user: "@Jasonzyt",
    url: "https://github.com/Jasonzyt"
  },
  {
    icon: 'my:bilibili-logo',
    style: '',
    website: 'Bilibili',
    user: "@Jasonzyt",
    url: "https://space.bilibili.com/403482845"
  },
  {
    icon: 'logos:twitter',
    style: '',
    website: 'Twitter',
    user: "@Jasonzyt",
    url: "https://x.com/Jasonzyt"
  },
  {
    icon: 'logos:telegram',
    style: '',
    website: 'Telegram',
    user: "@Jasonzyt",
    url: "https://t.me/Jasonzyt"
  },
  {
    icon: 'logos:discord-icon',
    style: '',
    website: 'Discord',
    user: "@jasonzyt",
    url: "https://discord.com"
  },
  {
    icon: 'my:email',
    style: '',
    website: 'Email',
    user: "@jasonzytt",
    url: 'mailto:jasonzytt@gmail.com'
  }
]
</script>

<style scoped>
.social {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>