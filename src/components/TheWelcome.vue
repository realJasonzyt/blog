<script setup lang="ts">
import { ref } from 'vue'
import $config from '@/_config'

const backgrounds = $config.Index.backgrounds

let requiredProps = []
requiredProps.push(
  document.documentElement.clientWidth > document.documentElement.clientHeight
    ? 'horizontal'
    : 'vertical'
)
// requiredProps.push(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

let matchedBackgrounds = backgrounds.filter((background: any) =>
  requiredProps.every((prop) => background.props.includes(prop))
)

const background = ref(matchedBackgrounds[Math.floor(Math.random() * matchedBackgrounds.length)])

const handleClickDown = () => {
  window.scrollTo({
    top: document.documentElement.clientHeight,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="background" :style="{ 'background-image': `url('${background.path}')` }">
    <div class="hello hidden-xs-only">
      <h1>{{ $config.Index.welcome }}</h1>
      <div class="quote">
        <el-icon><IconQuoteLeft /></el-icon>
        <span>{{ $config.Index.quote }}</span>
        <!-- <span>個性捨てたら，死んでるのと一緒だよ</span> -->
        <el-icon><IconQuoteRight /></el-icon>
        <p></p>
      </div>
    </div>
  </div>
  <div class="chevron-down" @click="handleClickDown">
    <el-icon>
      <IconChevronDown />
    </el-icon>
  </div>
</template>

<style scoped>
.background {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
  height: 100vh;
  position: relative;
  display: table;
  z-index: 0;
}

.hello {
  display: table-cell;
  vertical-align: middle;
  position: relative;
  text-align: center;
  z-index: 1;
  max-width: 1280px;
  padding: 0 1rem;
  line-height: 1.5;
  transition: opacity 0.4s ease-in-out;
}

.hello h1 {
  color: #fff;
  font-size: 5.5rem;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  word-spacing: 0.6rem;
  user-select: none;
}

.quote {
  border-radius: 10px;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  width: fit-content;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.25);
}

.quote .el-icon + span,
.quote span + .el-icon {
  margin-left: 0.5rem;
}

.quote span {
  font-size: 1.5rem;
  text-align: center;
  user-select: none;
  margin: 0;
  padding: 0;
}

@keyframes float {
  0% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }

  50% {
    -webkit-transform: translateY(-8px);
    -ms-transform: translateY(-8px);
    transform: translateY(-8px);
  }

  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}

.chevron-down {
  position: absolute;
  bottom: 2rem;
  text-align: center;
  left: calc(50vw - 1.5rem);
  z-index: 1;
  animation: float 3s ease-in-out infinite;
}

.chevron-down .el-icon {
  font-size: 3rem;
  color: #fff;
  cursor: pointer;
}

.chevron-down svg {
  transform: scale(1, 0.6);
}
</style>
