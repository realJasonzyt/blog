import axios from 'axios'
import { ref, type Ref } from 'vue'

export function textToSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function parseKeywords(str: string): string[] {
  const result: string[] = []
  let kw = ''
  let inSingleQuote = false
  let inDoubleQuote = false
  for (let i = 0; i < str.length; i++) {
    const ch = str[i]
    if (ch === ' ' && !inSingleQuote && !inDoubleQuote) {
      if (kw === '') {
        continue
      }
      result.push(kw)
      kw = ''
      continue
    }
    if (ch === '"' && !inSingleQuote) {
      if (inDoubleQuote) {
        if (kw === '') {
          inDoubleQuote = false
          continue
        }
        result.push(kw)
        kw = ''
        inDoubleQuote = false
        continue
      }
      inDoubleQuote = true
    }
    if (ch === "'" && !inDoubleQuote) {
      if (inSingleQuote) {
        if (kw == '') {
          inSingleQuote = false
          continue
        }
        result.push(kw)
        kw = ''
        inSingleQuote = false
        continue
      }
      inSingleQuote = true
    }
    kw += ch
  }
  return result
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function simplifyNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B'
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M'
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString()
}

export function isTouchScreen(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function getElementAttributes(el: Element): Record<string, string> {
  const attrs: Record<string, string> = {}
  for (let i = 0; i < el.attributes.length; i++) {
    const attr = el.attributes[i]
    attrs[attr.name] = attr.value
  }
  return attrs
}

let lastUpdateHitokoto = 0
const curHitokoto = ref({
  hitokoto: '合抱之木，生于毫末；九层之台，起于累土；千里之行，始于足下。',
  from: '《老子》'
})

export function updateHitokoto(): Ref<{ hitokoto: string; from: string }> {
  if (Date.now() - lastUpdateHitokoto < 5 * 1000) {
    return curHitokoto
  }
  lastUpdateHitokoto = Date.now()
  axios
    .get('https://v1.hitokoto.cn?c=a&c=b&c=c&c=d&c=h&c=i&c=k')
    .then((response) => {
      curHitokoto.value = response.data
    })
    .catch((error) => {
      console.error(error)
    })
  return curHitokoto
}
