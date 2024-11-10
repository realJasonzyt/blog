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
