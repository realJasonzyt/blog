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
  <div class="background" :style="{ 'background-image': `url('${background.path}')` }"></div>
  <div class="hello">
    <p>HI, JASONZYT!</p>
  </div>
</template>

<style scoped>
.background {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: table;
  z-index: 0;
  overflow-x: hidden;
}
.hello {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 100%;
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
}
</style>
