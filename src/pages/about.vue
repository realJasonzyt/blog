<script setup lang="ts">
import $config from '@/_config'
import { IconSvgMap } from '@/icon';

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
    name: '战地五',
    server: '-'
  },
  {
    name: '雨中冒险2',
    server: '-'
  }
]

const dualGameList: Array<Array<{ name: string, server: string }>> = []

for (let i = 0; i < gameList.length; i += 2) {
  if (i + 1 >= gameList.length) {
    dualGameList.push(gameList.slice(i))
    break
  }
  dualGameList.push(gameList.slice(i, i + 2))
}

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
    url: "https://space.bilibili.com/" // TODO:
  },
  {
    icon: IconSvgMap.Twitter,
    website: 'Twitter(X)',
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
    icon: IconSvgMap.Mail,
    website: 'Email',
    user: "jasonzytt@gmail.com",
    url: "mailto:jasonzytt@gmail.com"
  }
]

</script>

<template>
  <!-- TODO: Birthday Party! -->
  <div class="cover"></div>
  <div class="main">
    <div class="avatar">
      <el-avatar :size="200">
        <img :src="$config.avatar" />
      </el-avatar>
    </div>
    <h1 class="name">Jasonzyt <span class="pronoun">he/she🌈</span></h1>
    <div class="brief">
      非常感谢你能来到我的家里玩——<br />
      我是Jason(aka ZYT)，17岁，来自武汉！是高中牲😢<br />
      写代码👨‍💻是爱好，初一自学C++，曾经打过几年OI，<del>也算是蒟蒻OIer吧</del><br />
      曾经为<a href="https://minecraft.wiki/w/Bedrock_Dedicated_Server">Minecraft BDS</a>圈子奉献<del>三年青春</del><br />
      致力于<a href="https://github.com/LiteLDev/LeviLamina">LeviLamina</a>的开发和MCBE的研究<!--不要玩基岩版！基岩不行，加瓦行-->，也是<a
        href="https://github.com/LiteLDev">LiteLDev</a>的一份子！<br />
      除写码之外，我也很喜欢拍照📷~ 是风光佬，偶尔拍人文<br />
      喜欢各种交通工具，尤其是飞机✈️和火车🚅！！有机会的话会拍！<br />
      你可以在<RouterLink to="/gallery">Gallery(在建)</RouterLink>看到我的作品！谢谢你的喜欢！<br />
      有时候会打电动，不是很擅长FPS游戏，想和我玩的话只要有空随时可以！<br />
      喜欢看动画，<del>百合什么的最喜欢啦</del><br />
      可以用中文/English与我交流，日语还在自学ing...<br />
      <span class="spolier"></span>
    </div>
    <br />
    <div class="games">
      <h2>Games</h2>
      <el-row :gutter="10" class="hidden-sm-and-down">
        <el-col v-for="(game, index) in gameList" :key="index" :span="3">
          <el-card class="game-card">
            <h3 class="game-name">{{ game.name }}</h3>
            <span class="game-server">{{ game.server }}</span>
          </el-card>
        </el-col>
      </el-row>
      <div class="hidden-md-and-up">
        <el-row v-for="(dualGame, index) in dualGameList" :gutter="10">
          <el-col v-for="(game, index) in dualGame" :key="index" :span="12">
            <el-card class="game-card">
              <h3 class="game-name">{{ game.name }}</h3>
              <span class="game-server">{{ game.server }}</span>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="languages">
      <h2>Languages</h2>
      <code><el-icon :size="16"><IconCPP/></el-icon>C++</code>&nbsp;
      <code><el-icon :size="16"><IconVue/></el-icon>Vue</code>&nbsp;
      <code><el-icon :size="16"><IconKotlin/></el-icon>Kotlin</code>&nbsp;
      <code><el-icon :size="16"><IconPython/></el-icon>Python</code>&nbsp;
      <code><el-icon :size="16"><IconGolang/></el-icon>Golang</code>
    </div>
    <div class="social">
      <h2>Social</h2>
      <el-row :gutter="10" class="hidden-sm-and-down">
        <el-col v-for="(social, index) in socialList" :key="index" :span="5">
          <a :href="social.url">
            <el-card class="social-card">
              <el-row>
                <el-col :span="8" class="social-icon">
                  <el-icon :size="40" v-html="social.icon">
                  </el-icon>
                </el-col>
                <el-col :span="16">
                  <h3 class="social-website">{{ social.website }}</h3>
                  <span class="social-user">{{ social.user }}</span>
                </el-col>
              </el-row>
            </el-card>
          </a>
        </el-col>
      </el-row>
      <div class="hidden-md-and-up">
        <div v-for="(social, index) in socialList" :key="index">
          <a :href="social.url">
            <el-card class="social-card">
              <el-row>
                <el-col :span="8" class="social-icon">
                  <el-icon :size="40" v-html="social.icon">
                  </el-icon>
                </el-col>
                <el-col :span="16">
                  <h3 class="social-website">{{ social.website }}</h3>
                  <span class="social-user">{{ social.user }}</span>
                </el-col>
              </el-row>
            </el-card>
          </a>
        </div>
      </div>
    </div>
    <br />
  </div>
  <div class="footer">
    <div class="footer-content">
      <p id="hitokoto">
        <code>0 Warning(s), 0 Error(s)</code>
      </p>
      <br />
      <br />
      <p v-html="$config.footer"></p>
      <p class="power-vue">
        Powered by
        <a href="https://vuejs.org/" class="vue">
          <el-icon size="0.8em">
            <IconVue />
          </el-icon>ue.js
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
body {
  color: #f5f5f5;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 8px;
}

.el-card {
  --el-card-border-radius: 10px;
}

.cover {
  width: 100%;
  height: 25vh;
  background-image: url('/assets/img/backgrounds/109884134_p0.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.main {
  padding: 25px 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.name {
  font-size: 48px;
  font-weight: bold;
}

.pronoun {
  margin: 0 10px;
  font-size: 24px;
}

.brief {
  font-size: 18px;
}

.main a {
  color: rgb(23, 147, 255);
  text-decoration: none;
}

.main a:hover {
  color: rgb(20, 111, 190);
}

.games {
  margin-bottom: 20px;
}

.games .el-row {
  margin-bottom: 10px;
}

.game-card {
  --el-card-padding: 15px;
}

.game-name {
  font-size: 18px;
}

.game-server {
  font-size: 12px;
  color: #666;
}

.languages .el-icon {
  margin-right: 5px;
}

.languages code {
  display: inline-block;
  font-size: 18px;
  margin-bottom: 6px;
}

.languages {
  margin-bottom: 20px;
}

.languages img {
  margin-right: 4px;
}

.social {
  margin-bottom: 20px;
}

.social>.el-row {
  margin-bottom: 10px;
}

.social-card {
  --el-card-padding: 15px;
}

.social-card .social-icon {
  text-align: center;
}

.social-card .el-icon {
  display: inline-block;
  margin-top: 4px;
}

.social-website {
  font-size: 18px;
}

.social-user {
  font-size: 12px;
  color: #666;
}

.footer {
  height: 12rem;
  color: #666;
  text-align: center;
  padding: 50px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

#hitokoto {
  font-size: 16px;
  color: #666;
  width: fit-content;
  display: inline-block;
}

.power-vue a {
  color: #42b883;
  text-decoration: none;
  transition: color 0.4s ease-in-out;
}

.power-vue a:hover {
  color: #35495e;
}

@media screen and (max-width: 768px) {
  .cover {
    height: 20vh;
  }

  .main {
    padding: 50px 2rem;
  }

  .name {
    font-size: 42px;
  }

  .pronoun {
    font-size: 20px;
  }
}
</style>