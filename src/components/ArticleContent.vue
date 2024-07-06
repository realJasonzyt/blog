<script lang="ts">
import { getArticle, utils } from '@/api'
import CodeBlock from '@/components/CodeBlock.vue'
import AnchorHeader from './AnchorHeading.vue'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.min.css'

import MarkdownIt from 'markdown-it'
import MarkdownItKatex from '@vscode/markdown-it-katex'
import { align as MarkdownItAlign } from "@mdit/plugin-align";

import { h, render, type VNode } from 'vue'

// TODO: Outline
// const titles: Record<string, string> = {}
const renderHeader = (el: Element) => {
  const id = utils.textToSlug(el.textContent || '')
  // if (el.tagName === 'H1') {
  //   titles[el.innerHTML] = id
  // }
  return h(AnchorHeader, { id, tag: el.tagName, heading: el.innerHTML })
}

const renderOverrides: Record<string, (el: Element) => VNode | VNode[]> = {
  PRE: (el: Element) => h(
    CodeBlock,
    {
      language: el.children[0].className.replace('language-', ''),
      onCopy: () => {
        if (el.textContent) {
          navigator.clipboard.writeText(el.textContent)
        }
      }
    },
    { default: () => h('pre', { innerHTML: el.innerHTML }) }
  ),
  H1: renderHeader,
  H2: renderHeader,
  H3: renderHeader
}

const renderHTML = (elements: HTMLCollection): VNode[] => {
  let vnodes: VNode[] = []
  for (let i = 0; i < elements.length; i++) {
    const child = elements[i];
    // Override
    if (renderOverrides[child.tagName]) {
      const result = renderOverrides[child.tagName](child)
      if (Array.isArray(result)) {
        vnodes.push(...result);
        continue;
      }
      vnodes.push(result);
      continue;
    }
    // Normal
    const attrs: Record<string, string> = {};
    const attrNames = child.getAttributeNames();
    for (let i = 0; i < attrNames.length; i++) {
      attrs[attrNames[i]] = child.getAttribute(attrNames[i]) ?? ""
    }
    let inner = renderHTML(child.children);
    vnodes.push(h(child.tagName, attrs, { default: () => inner }))
  }
  return vnodes;
}

export default {
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  async setup(props) {
    const article = getArticle(props.slug)
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
    const md = MarkdownIt({
      highlight: function (str, lang) {
        if (lang || hljs.getLanguage(lang)) {
          return hljs.highlight(str, { language: lang }).value
        }
        return ''
      },
      html: true
    })
    md.use(MarkdownItKatex)
    md.use(MarkdownItAlign)
    const content = md.render(text)
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const blocks: VNode[] = renderHTML(doc.body.children)
    return () => h('div', blocks)
  }
}
</script>

<style scoped></style>