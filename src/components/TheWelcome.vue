<script setup lang="ts">
import { ref } from 'vue'

const Backgrounds = [
  { path: '/assets/img/backgrounds/74922836_p0.jpg', props: ['horizontal', 'dark'] },
  { path: '/assets/img/backgrounds/100022190_p0_small.jpg', props: ['horizontal', 'light'] }
]

let requiredProps = []
requiredProps.push(
  document.documentElement.clientWidth > document.documentElement.clientHeight
    ? 'horizontal'
    : 'vertical'
)
// requiredProps.push(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

let matchedBackgrounds = Backgrounds.filter((background) =>
  requiredProps.every((prop) => background.props.includes(prop))
)
let background = ref(matchedBackgrounds[Math.floor(Math.random() * matchedBackgrounds.length)])
</script>

<template>
  <div class="background" :style="{ 'background-image': `url('${background.path}')` }">
    <div class="hello">
      <p>HI, JASONZYT!</p>
      <div class="contact"></div>
    </div>
  </div>
  <div class="chevron-down">
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

.hello p {
  color: #fff;
  font-size: 5.5rem;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  word-spacing: 0.6rem;
  user-select: none;
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
  left: 50%;
  bottom: 2rem;
  text-align: center;
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
