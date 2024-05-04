<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const hitokoto = ref({
  hitokoto: '合抱之木，生于毫末；九层之台，起于累土；千里之行，始于足下。',
  from: '《老子》'
})

const updateHitokoto = () => {
  axios
    .get('https://v1.hitokoto.cn?c=a&c=b&c=c&c=d&c=h&c=i&c=k')
    .then((response) => {
      hitokoto.value = response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

// setInterval(updateHitokoto, 5 * 60 * 1000)
updateHitokoto()
</script>

<template>
  <div class="footer">
    <div class="footer-content">
      <el-popover placement="right" trigger="hover">
        <template #reference>
          <p id="hitokoto" ref="hitokotoPopOver">
            {{ hitokoto.hitokoto }}
          </p>
        </template>
        <template #default> ——{{ hitokoto.from }}</template>
      </el-popover>
      <br />
      <br />
      <p>&copy;Jasonzyt {{ new Date().getFullYear() }}</p>
      <p class="power-vue">
        Powered by
        <a href="https://vuejs.org/">
          <el-icon size="0.8em"><IconVue /></el-icon>ue.js
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.footer {
  height: 12rem;
  background-color: #fff;
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
  color: #888;
  text-decoration: none;
  transition: color 0.4s ease-in-out;
}

.power-vue a:hover {
  color: #585858;
}
</style>
