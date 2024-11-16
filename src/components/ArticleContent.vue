<script lang="ts">
import { getArticle } from '@/scripts/article'
import { getElementAttributes, textToSlug } from '@/scripts/util'
import CodeBlock from '@/components/CodeBlock.vue'
import AnchorHeader from './AnchorHeading.vue'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.min.css'

import MarkdownIt from 'markdown-it'
import MarkdownItKatex from '@vscode/markdown-it-katex'
import { align as MarkdownItAlign } from "@mdit/plugin-align";

import { h, type VNode } from 'vue'

// TODO: Outline
// const titles: Record<string, string> = {}
const renderHeader = (el: Element) => {
  const id = textToSlug(el.textContent || '')
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

const renderHTML = (nodes: NodeListOf<ChildNode>): VNode[] => {
  let vnodes: VNode[] = []
  for (let i = 0; i < nodes.length; i++) {
    const childNode = nodes[i];
    switch (childNode.nodeType) {
      case Node.ELEMENT_NODE:
        const child = childNode as Element
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
        const attrs = getElementAttributes(child)
        // Special
        if (child.tagName == 'A') {
          if (attrs['class']) {
            attrs['class'] += ' link'
          }
          else {
            attrs['class'] = 'link'
          }
        }
        if (child.children.length == 0) {
          vnodes.push(h(child.tagName, attrs, { default: () => child.innerHTML }))
          continue
        }
        let inner = renderHTML(child.childNodes);
        vnodes.push(h(child.tagName, attrs, { default: () => inner }))
        break;
      case Node.TEXT_NODE:
        vnodes.push(h('span', {}, { default: () => childNode.textContent }))
        break;
    }
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
      // TODO: Rewrite this
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
    const blocks: VNode[] = renderHTML(doc.body.childNodes)
    return () => h('div', blocks)
  }
}
</script>

<style scoped></style>