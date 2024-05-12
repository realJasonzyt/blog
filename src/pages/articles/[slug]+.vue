<script lang="ts">
import { getArticle } from '@/api'
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'
import markdownIt from 'markdown-it'
import markdownItKatex from '@vscode/markdown-it-katex'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.min.css'

export const useArticle = defineBasicLoader('/articles/[slug]+', async (route) => {
  const { slug } = route.params
  if (slug.length > 1) {
    return null
  }
  const article = getArticle(slug[0])
  if (!article) {
    return null
  }
  const response = await article.content.fetch()
  const text = await response.text()
  // pre-process the markdown content
  for (const match of text.matchAll(/```([a-z0-9]+)/g)) {
    const lang = match[1]
    if (hljs.getLanguage(lang)) {
      continue
    }
    const language = await fetch(
      `https://cdn.staticfile.net/highlight.js/11.9.0/es/languages/${lang}.min.js`
    )
    if (language.ok) {
      const cache = localStorage.getItem(`hljsGrammarCache_${lang}`)
      if (cache) {
        hljs.registerLanguage(lang, eval(cache))
        continue
      }
      let code = await language.text()
      code = code.replace(/export default(.+);/g, 'hljsGrammar')
      localStorage.setItem(`hljsGrammarCache_${lang}`, code)
      let langFn = eval(code)
      hljs.registerLanguage(lang, langFn)
    }
  }
  const md = markdownIt({
    highlight: function (str, lang) {
      if (lang || hljs.getLanguage(lang)) {
        console.log(lang)
        return hljs.highlight(str, { language: lang }).value
      }
      return '' // use external default escaping
    }
  })
  md.use(markdownItKatex)
  const content = md.render(text)
  return {
    article,
    content: content
  }
})
</script>

<script setup lang="ts">
const { data } = useArticle()
</script>

<template>
  <div class="cover">
    <img class="hidden-xs-only" :src="data?.article.cover" alt="cover" />
  </div>
  <div class="main">
    <div class="header"></div>
    <div class="body">
      <h1>{{ data?.article.title }}</h1>
      <div v-html="data?.content"></div>
    </div>
  </div>
</template>

<style>
.katex-html {
  display: none;
}
</style>

<style scoped>
.cover {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover::after {
  content: '';
  display: block;
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 0) 85%,
    rgba(255, 255, 255, 1) 100%
  );
}

.main {
  padding: 200px 2rem;
}

.header {
  position: relative;
  padding: 20px;
  text-align: center;
}

.body {
  padding: 20px 2rem;
}
</style>
