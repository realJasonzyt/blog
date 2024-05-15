<script lang="ts">
import { getArticle } from '@/api'
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
    for (let i = 0; i < doc.body.children.length; i++) {
      const child = doc.body.children[i]
      if (child.tagName === 'PRE') {
        blocks.push(
          h(
            CodeBlock,
            {
              language: child.children[0].className.replace('language-', ''),
              onCopy: () => {
                if (child.textContent) {
                  navigator.clipboard.writeText(child.textContent)
                }
              }
            },
            { default: () => h('pre', { innerHTML: child.innerHTML }) }
          )
        )
      } else {
        blocks.push(h(child.tagName, { innerHTML: child.innerHTML }))
      }
    }
    return () => h('div', blocks)
  }
}
</script>
