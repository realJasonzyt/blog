<script setup lang="ts">
import $config from '@/_config'
import { updateHitokoto } from '@/scripts/util';

// setInterval(updateHitokoto, 5 * 60 * 1000)
const hitokoto = updateHitokoto()

const documentWidth = document.documentElement.clientWidth
</script>

<template>
  <div class="footer">
    <div class="footer-content">
      <el-popover :placement="documentWidth < 768 ? 'bottom' : 'right'" trigger="hover">
        <template #reference>
          <p id="hitokoto" ref="hitokotoPopOver">
            {{ hitokoto.hitokoto }}
          </p>
        </template>
        <template #default> ——{{ hitokoto.from }}</template>
      </el-popover>
      <br />
      <br />
      <p v-html="$config.footer"></p>
      <p class="powered-by">
        Powered by
        <a href="https://github.com/Jasonzyt/campu" class="campu">
          <el-icon size="0.8em">
            <IconCampu />
          </el-icon>
          Campu
        </a>
        with
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

.powered-by a.campu {
  color: #5e7296;
  transition: color 0.4s ease-in-out;
}

.powered-by a.campu:hover {
  color: #43526d;
}

.powered-by a.vue {
  color: #42b883;
  transition: color 0.4s ease-in-out;
}

.powered-by a.vue:hover {
  color: #35495e;
}
</style>
