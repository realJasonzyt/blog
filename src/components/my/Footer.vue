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
          <Icon name="my:campu-logo" size="0.8em" />
        </a>
        with
        <a href="https://vuejs.org/" class="nuxt">
          <Icon name="logos:nuxt" size="0.8em" />
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.footer {
  height: 12rem;
  color: #444;
  text-align: center;
  padding: 50px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

#hitokoto {
  font-size: 16px;
  width: fit-content;
  display: inline-block;
}
</style>
