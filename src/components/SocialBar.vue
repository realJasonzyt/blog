<script setup lang="ts">
import { IconSvgMap } from '@/icon';

defineProps<{ size: number }>();

const socialList = [
  {
    icon: IconSvgMap.GitHub,
    website: 'GitHub',
    user: "@realJasonzyt",
    url: "https://github.com/realJasonzyt"
  },
  {
    icon: IconSvgMap.Bilibili,
    website: 'Bilibili',
    user: "@Jasonzyt",
    url: "https://space.bilibili.com/403482845"
  },
  {
    icon: IconSvgMap.Twitter,
    website: 'Twitter',
    user: "@Jasonzyt",
    url: "https://x.com/Jasonzyt"
  },
  {
    icon: IconSvgMap.Telegram,
    website: 'Telegram',
    user: "@Jasonzyt",
    url: "https://t.me/Jasonzyt"
  },
  {
    icon: IconSvgMap.Discord,
    website: 'Discord',
    user: "@jasonzyt",
    url: "https://discord.com"
  },
  {
    icon: IconSvgMap.Mail,
    website: 'Email',
    user: "@jasonzytt",
    url: 'mailto:jasonzytt@gmail.com'
  }
]
</script>

<template>
  <div class="social">
    <a v-for="social in socialList" :key="social.website" :href="social.url" target="_blank">
      <el-icon :size="size" v-html="social.icon">
      </el-icon>
    </a>
  </div>
</template>

<style scoped>
.social {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
}

a {
  margin: 0 1rem;
}
</style>