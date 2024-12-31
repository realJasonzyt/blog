<template>
  <!-- TODO: Birthday Party! -->
  <div class="cover"></div>
  <div class="body p-6 text-gray-800">
    <div class="w-full">
      <div class="avatar">
        <UAvatar size="3xl" :src="$config.avatar" :ui="{ size: { '3xl': 'size-32 md:size-56 text-4xl' } }" />
      </div>
      <h1 class="mt-3 text-3xl md:text-5xl" id="name">Jasonzyt <span id="pronoun"
          class="mx-1 text-xl md:text-2xl font-normal">he/she🌈</span>
      </h1>
    </div>
    <div class="mt-2 w-full flex lg:flex-row flex-col">
      <div class="flex-none lg:w-[70%]">
        <div class="mt-3 text-lg" id="brief">
          非常感谢你能来到我的家里玩—— Orz<br />
          我是Jason(aka ZYT)，{{ age.year }}岁，来自武汉！是高中牲😢<br />
          写代码👨‍💻是爱好，初一自学C++，曾经打过几年OI，<del>也算是蒟蒻OIer吧</del><br />
          曾经为<NuxtLink class="link" to="https://minecraft.wiki/w/Bedrock_Dedicated_Server">Minecraft
            BDS</NuxtLink>圈子奉献<del>三年青春</del><br />
          致力于<NuxtLink class="link" to="https://github.com/LiteLDev/LeviLamina">LeviLamina</NuxtLink>
          的开发和MCBE的研究<!--不要玩基岩版！基岩不行，加瓦行-->，也是<NuxtLink class="link" to="https://github.com/LiteLDev">LiteLDev
          </NuxtLink>的一份子！<br />
          除写码之外，我也很喜欢拍照📷~ 是风光佬，偶尔拍人文<br />
          喜欢各种交通工具，尤其是飞机✈️和火车🚅！！有机会的话会拍！<br />
          你可以在<NuxtLink class="link" to="/gallery">Gallery</NuxtLink>看到我的作品！谢谢你的喜欢！<br />
          最近在研究业余无线电！入了一台泉盛UV-K6，还没有呼号ww<br />
          摇曳露营△大好き，正在筹备户外装备，也许2024/25年冬能实装摇曳露营(?)<br />
          有时候会打电动，不是很擅长FPS游戏，想和我玩的话只要有空随时可以！<br />
          喜欢看动画，<del>百合什么的最喜欢啦</del><br />
          可以用中文/English与我交流，日语还在自学ing...<br />
          我对所有人都很友好！不会主动与别人产生冲突<br />
          <br />
          <span class="spoiler">🌈🏳️‍⚧️ LGBT+友好 ⚠️ 拒绝讨论政治，反感魔怔人，反对药物滥用和自伤！！</span><br />
        </div>
        <br />
        <div id="languages" class="text-xl">
          <h2 class="mb-2">Languages</h2>
          <div class="grid grid-cols-3 gap-2 text-center lg:grid-cols-6">
            <code v-for="lang in languageList">
              <Icon class="text-lg mr-0.5 align-middle" :name="lang.icon" />
              <span class="text-[17px]">{{ lang.name }}</span>
            </code>
          </div>
        </div>
        <br />
        <div id="social">
          <h2 class="mb-2">Socials</h2>
          <div class="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            <div v-for="social in socialList">
              <NuxtLink :to="social.url">
                <UCard class="hover:shadow-lg transition-shadow" :ui="{ body: { padding: 'p-4 sm:p-4' } }">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="col-span-1">
                      <Icon :name="social.icon" mode="svg" width="100%" height="100%" />
                    </div>
                    <div class="col-span-2">
                      <h3 class="text-lg">{{ social.website }}</h3>
                      <span class="text-xs text-gray-600">{{ social.user }}</span>
                    </div>
                  </div>
                </UCard>
              </NuxtLink>
            </div>
          </div>
        </div>
        <br />
        <div id="games">
          <h2 class="mb-2">Games</h2>
          <div class="grid grid-cols-3 gap-3 lg:grid-cols-6 lg:gap-4">
            <div v-for="game in gameList">
              <UCard class="hover:shadow-md transition-shadow" :ui="{ body: { padding: 'p-3 sm:p-3' } }">
                <h3 class="text-lg">{{ game.name }}</h3>
                <span class="text-xs text-gray-600">{{ game.server }}</span>
              </UCard>
            </div>
          </div>
        </div>
        <br />
        <div class="bangumi" id="bangumi">
          <h2 class="mb-2">Bangumi</h2>
          <div class="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            <div v-for="bangumi in bangumiList">
              <UCard class="hover:shadow-lg transition-shadow" :ui="{ body: { padding: 'p-0 sm:p-0' } }">
                <NuxtImg class="w-full aspect-[4/3]" :src="bangumi.cover" alt="bangumi cover" />
                <h3 class="text-lg px-3 py-2 overflow-hidden text-ellipsis text-nowrap">{{ bangumi.name }}</h3>
              </UCard>
            </div>
          </div>
        </div>
        <br />
      </div>
      <UDivider orientation="vertical" class="px-6" />
      <div class="flex-none lg:w-1/4">
        <div id="experiences">
          <h2 class="mb-2">Experiences</h2>
          <div class="grid grid-cols-1 gap-3">
            <div v-for="experience in experienceList">
              <UCard class="hover:shadow-lg transition-shadow" :ui="{ body: { padding: 'p-4 sm:p-4' } }">
                <h3 class="text-lg">{{ experience.org }}</h3>
                <p class="text-md text-gray-900">{{ experience.position }}</p>
                <p class="text-sm text-gray-600">{{ experience.time }}</p>
              </UCard>
            </div>
          </div>
        </div>
        <br />
        <div id="projects">
          <h2 class="mb-2">Contributed to</h2>
          <div class="grid grid-cols-1 gap-3">
            <div v-for="project in projectList">
              <NuxtLink :to="project.url">
                <UCard class="hover:shadow-lg transition-shadow" :ui="{ body: { padding: 'p-4 sm:p-4' } }">
                  <h3 class="text-lg"><span class="font-normal">{{ project.owner }}/</span>{{ project.name }}</h3>
                  <p class="text-md text-gray-600">{{ project.desc }}</p>
                </UCard>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MyFooter>
    <template #default>
      <code>0 Warning(s), 0 Error(s)</code>
    </template>
  </MyFooter>
</template>


<script setup lang="ts">
import $config from '~/utils/_config'

useHead({
  title: 'About Me'
})

definePageMeta({
  layout: 'no-footer'
})

const birthTime = new Date(2007, 10, 18, 23, 4);

const now = new Date();

const age = (() => {
  let age = {
    year: now.getFullYear() - birthTime.getFullYear(),
    month: now.getMonth() - birthTime.getMonth(),
    day: now.getDate() - birthTime.getDate(),
    hour: now.getHours() - birthTime.getHours(),
    minute: now.getMinutes() - birthTime.getMinutes()
  }
  if (age.hour < 0) {
    age.hour = 24 + age.hour
    age.day -= 1
  }
  if (age.minute < 0) {
    age.minute = 60 + age.minute
    age.hour -= 1
  }
  if (age.day < 0) {
    age.day = 30 + age.day
    age.month -= 1
  }
  if (age.month < 0) {
    age.month = 12 + age.month
    age.year -= 1
  }
  return age
})()

const languageList = [
  {
    name: "C++",
    icon: "vscode-icons:file-type-cpp3"
  },
  {
    name: "Python",
    icon: "vscode-icons:file-type-python"
  },
  {
    name: "Go",
    icon: "my:golang-logo"
  },
  {
    name: "Java",
    icon: "logos:java"
  },
  {
    name: "Kotlin",
    icon: "my:kotlin-logo"
  },
  {
    name: "Vue",
    icon: "logos:vue"
  }
]

const gameList = [
  {
    name: 'Minecraft',
    server: 'Java/BE'
  },
  {
    name: '战舰世界',
    server: 'Asia'
  },
  {
    name: '原神',
    server: 'CN_Official'
  },
  {
    name: '战地5',
    server: '-'
  },
  {
    name: '雨中冒险',
    server: '2'
  },
  {
    name: '微软模飞',
    server: '2020'
  }
]

const socialList = [
  {
    icon: 'logos:github-icon',
    website: 'GitHub',
    user: "@Jasonzyt",
    url: "https://github.com/Jasonzyt"
  },
  {
    icon: 'my:bilibili-logo',
    website: 'Bilibili',
    user: "@Jasonzyt",
    url: "https://space.bilibili.com/403482845"
  },
  {
    icon: 'logos:twitter',
    website: 'Twitter',
    user: "@Jasonzyt",
    url: "https://x.com/Jasonzyt"
  },
  {
    icon: 'logos:telegram',
    website: 'Telegram',
    user: "@Jasonzyt",
    url: "https://t.me/Jasonzyt"
  },
  {
    icon: 'logos:discord-icon',
    website: 'Discord',
    user: "@jasonzyt",
    url: "https://discord.com"
  },
  {
    icon: 'my:steam-logo',
    website: 'Steam',
    user: "@jasonzytt",
    url: "https://steamcommunity.com/id/jasonzytt"
  },
  {
    icon: 'logos:youtube-icon',
    website: 'YouTube',
    user: "@jasonzyt",
    url: 'https://www.youtube.com/@jasonzyt'
  },
  {
    icon: 'my:email',
    website: 'Email',
    user: "@jasonzytt",
    url: 'mailto:jasonzytt@gmail.com'
  }
]

const bangumiList = [
  {
    name: "摇曳露营△",
    cover: "/assets/img/bangumi-covers/yurucamp/" + randInt(1, 7).toString() + ".jpg",
    url: "https://yurucamp.jp/"
  },
  {
    name: "孤独摇滚！",
    cover: "/assets/img/bangumi-covers/bocchitherock/" + randInt(1, 2).toString() + ".jpg",
    url: "https://bocchi.rocks/"
  },
  {
    name: "CLANNAD",
    cover: "/assets/img/bangumi-covers/clannad/" + randInt(1, 7).toString() + ".jpg",
    url: "https://zh.wikipedia.org/zh-cn/CLANNAD"
  },
  {
    name: "天使降临到我身边",
    cover: "/assets/img/bangumi-covers/wataten/" + randInt(1, 5).toString() + ".jpg",
    url: "https://zh.wikipedia.org/wiki/%E5%A4%A9%E4%BD%BF%E9%99%8D%E8%87%A8%E5%88%B0%E6%88%91%E8%BA%AB%E9%82%8A%EF%BC%81"
  }
]

const experienceList = [
  {
    org: "LiteLDev",
    position: "Developer",
    time: "2021.7 - Now",
    url: "https://github.com/LiteLDev",
  }
]

const projectList = [
  {
    owner: "LiteLDev",
    name: "LeviLamina",
    url: "https://github.com/LiteLDev/LeviLamina",
    lang: "C++",
    desc: "Versatile mod loader for MCBE"
  },
  {
    owner: "LiteLDev",
    name: "HeaderOutput",
    url: "https://github.com/LiteLDev/HeaderOutput",
    lang: "Kotlin",
    desc: "BDS headers generator"
  },
  {
    owner: "Jasonzyt",
    name: "campu",
    url: "https://github.com/Jasonzyt/campu",
    lang: "Vue",
    desc: "This blog, also my first Nuxt project"
  },
  {
    owner: "Jasonzyt",
    name: "exif4cpp",
    url: "https://github.com/Jasonzyt/exif4cpp",
    lang: "C++",
    desc: "(WIP) Modern JPEG Exif metadata parser"
  },
  {
    owner: "ddf8196",
    name: "FakePlayer",
    url: "https://github.com/ddf8196/FakePlayer",
    lang: "Java",
    desc: "Fake player client for MCBE"
  },
  {
    owner: "Majjcom",
    name: "ncmpp",
    url: "https://github.com/Majjcom/ncmpp",
    lang: "C++",
    desc: "Fastest Netease .ncm files cracker"
  }
]

</script>

<style scoped>
body {
  color: #f5f5f5;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 8px;
}

h3 {
  font-weight: 500;
}

.cover {
  width: 100%;
  height: 25vh;
  /* TODO: customize */
  background-image: url('/assets/img/backgrounds/109884134_p0.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.body {
  margin: 0 auto;
  max-width: 1200px;
}
</style>