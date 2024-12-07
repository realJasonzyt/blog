<template>
  <div class="block" @mouseenter="showButton = true" @mouseleave="showButton = false">
    <pre :class="$props.class"><slot /></pre>
    <el-button v-show="showButton || showCheck" class="copy" type="info" @click="onClick" @mouseleave="onMouseLeave">
      <Icon name="ic:round-content-copy" size="1.2rem" v-show="!showCheck" />
      <Icon name="uil:check" size="1.2rem" color="#1a7f37" v-show="showCheck" />
    </el-button>
    <span v-if="filename == null" v-show="!showButton" class="lang">{{ language }}</span>
    <span v-if="filename != null" v-show="!showButton" class="filename">{{ filename }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})

const showButton = ref(false)
const showCheck = ref(false)

const onClick = () => {
  navigator.clipboard.writeText(props.code)
  showCheck.value = true
}

const onMouseLeave = () => {
  setTimeout(() => {
    showCheck.value = false
  }, 2000)
}

</script>

<style>
span.line::before {
  content: attr(line);
  text-align: right;
  width: 1.5em;
  margin-right: 30px;
  display: inline-block;
}
</style>

<style scoped>
.block {
  position: relative;
  margin: 0;
  padding: 0;
}

.copy {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
}

.el-button {
  right: 0.2em;
  top: 0.2em;
  width: 3em;
  height: 3em;
  z-index: 2;
  background: #f5f5f5;
}

.el-button:hover {
  color: #409eff;
  background-color: #e0e0e0;
}

.lang,
.filename {
  position: absolute;
  right: 1.2em;
  top: 0.8em;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: #666;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.lang {
  text-transform: uppercase;
}
</style>
