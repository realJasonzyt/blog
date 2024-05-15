<script lang="ts">
import { getArticle, utils } from '@/api'
import CodeBlock from '@/components/CodeBlock.vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.min.css'
import MarkdownIt from 'markdown-it'
import MarkdownItKatex from '@vscode/markdown-it-katex'
import { h, type VNode } from 'vue'

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
    const content = md.render(text)
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const blocks: VNode[] = []
    const titles: Record<string, string> = {}
    const addHeaderId = (el: Element) => {
      const id = utils.textToSlug(el.textContent || '')
      return h(el.tagName, { innerHTML: el.innerHTML, id })
    }
    const replaces: Record<string, (el: Element) => VNode> = {
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
      H1: (el: Element) => {
        const id = utils.textToSlug(el.textContent || '')
        titles[el.innerHTML] = id
        return h('h1', { innerHTML: el.innerHTML, id })
      },
      H2: addHeaderId,
      H3: addHeaderId,
      H4: addHeaderId,
      H5: addHeaderId,
      H6: addHeaderId
    }
    for (let i = 0; i < doc.body.children.length; i++) {
      const child = doc.body.children[i]
      if (replaces[child.tagName]) {
        blocks.push(replaces[child.tagName](child))
      } else {
        blocks.push(h(child.tagName, { innerHTML: child.innerHTML }))
      }
    }
    return () => h('div', blocks)
  }
}
</script>
