<script setup lang="ts">
import $config from '@/utils/_config'
import { updateHitokoto } from '~/utils';

// setInterval(updateHitokoto, 5 * 60 * 1000)
const hitokoto = updateHitokoto()

const documentWidth = document.documentElement.clientWidth
</script>

<template>
  <div class="footer">
    <div class="footer-content">
      <slot name="default">
        <el-popover :placement="documentWidth < 768 ? 'bottom' : 'right'" trigger="hover">
          <template #reference>
            <p id="hitokoto" ref="hitokotoPopOver">
              {{ hitokoto.hitokoto }}
            </p>
          </template>
          <template #default> ——{{ hitokoto.from }}</template>
        </el-popover>
      </slot>
      <br />
      <br />
      <slot name="copyright">
        <p v-html="$config.footer.copyright"></p>
      </slot>
      <p class="powered-by">
        Powered by
        <a href="https://github.com/Jasonzyt/campu" class="campu">
          <MyIcon name="Campu" size="0.8em" />
          Campu
        </a>
        with
        <a href="https://vuejs.org/" class="vue">
          <MyIcon name="Vue" size="0.8em" />ue.js
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
