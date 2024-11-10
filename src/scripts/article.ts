import rawMetaData from '@/_meta_article.json?raw'
import $config from '@/_config'

import { plainToInstance, Type } from 'class-transformer'
import { simplifyNumber } from './util'

export enum ContentFormat {
  Markdown = 'md'
}

export enum MatchType {
  Title = 'title',
  Tags = 'tags',
  Category = 'category'
}

export class Article {
  public slug: string
  public title: string
  public cover: string // New property
  public tags: string[]
  public category: string
  @Type(() => Content)
  public content: Content
  @Type(() => Author)
  public author: Author
  public createdAt: string
  public updatedAt: string

  constructor(
    slug: string,
    title: string,
    cover: string,
    tags: string[],
    category: string,
    content: Content,
    author: Author,
    createdAt: string,
    updatedAt: string
  ) {
    this.slug = slug
    this.title = title
    this.cover = cover
    this.tags = tags
    this.category = category
    this.content = content
    this.author = author
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static create(
    slug: string,
    title: string,
    cover: string,
    tags: string[],
    category: string,
    content: Content,
    author: Author
  ) {
    const now = new Date().toISOString()
    return new Article(slug, title, cover, tags, category, content, author, now, now)
  }

  public async fetchStats(): Promise<ArticleStats> {
    return fetchArticleStats(this.slug)
  }

  public async fetchStringifiedViews(): Promise<string> {
    let stats = await this.fetchStats()
    if (stats.views == -1) {
      return '-'
    }
    return simplifyNumber(stats.views)
  }
}

export class Author {
  public name: string
  public extra: string
  public avatar: string

  constructor(name: string, extra: string = '', avatar: string = '') {
    this.name = name
    this.extra = extra
    this.avatar = avatar
  }
}

export class Content {
  public format: ContentFormat
  public url: string

  constructor(format: ContentFormat, url: string) {
    this.format = format
    this.url = url
  }

  fetch(): Promise<Response> {
    return fetch($config.articlesBase + this.url)
  }
}

export class Category {
  public id: string
  public name: string
  public description: string
  public color: string

  constructor(id: string, name: string, description: string, color: string) {
    this.id = id
    this.name = name
    this.description = description
    this.color = color
  }
}

export class ArticleMetaData {
  @Type(() => Article)
  public articles: Article[] = []
  @Type(() => Category)
  public categories: Category[] = []
}

export class Range {
  public start: number = 0
  public end: number = 0

  constructor(start: number, end: number) {
    this.start = start
    this.end = end
  }
}

export class SearchResult {
  public article: Article
  public matchedTitle: boolean = false
  public matchedTags: boolean = false
  public matchedCategory: boolean = false
  public titleMatchedRanges?: Range[]
  public tagsMatched?: string[]
  public categoryMatched?: string

  constructor(article: Article, matchType: MatchType, data?: any) {
    this.article = article
    switch (matchType) {
      case MatchType.Title:
        this.matchedTitle = true
        this.titleMatchedRanges = data
        break
      case MatchType.Tags:
        this.matchedTags = true
        this.tagsMatched = data
        break
      case MatchType.Category:
        this.matchedCategory = true
        this.categoryMatched = data
        break
    }
  }
}

export type ArticleStats = {
  views: number
}

export const metaData = plainToInstance(ArticleMetaData, JSON.parse(rawMetaData), {})

export const getArticle = (slug: string): Article | undefined => {
  return metaData.articles.find((article: Article) => article.slug === slug)
}

export const getArticles = (): Article[] => {
  return metaData.articles
}

export const searchArticles = (keywords: string[]): SearchResult[] => {
  const result: SearchResult[] = []
  // Pre-process
  const keyCategories: string[] = []
  for (let j = 0; j < keywords.length; j++) {
    if (getCategory(keywords[j])) {
      keyCategories.push(keywords[j])
      break
    }
  }

  for (let i = 0; i < metaData.articles.length; i++) {
    // Priority: Title > Tags > Category
    const article = metaData.articles[i]
    let matchType: MatchType | undefined = undefined
    let matchData: any = undefined
    // Match category
    for (let j = 0; j < keyCategories.length; j++) {
      if (keyCategories[j] === article.category) {
        matchType = MatchType.Category
        matchData = keyCategories[j]
      }
    }
    // Match tags
    keywords.forEach((kw) => {
      if (article.tags.indexOf(kw) !== -1) {
        if (!Array.isArray(matchData)) {
          matchType = MatchType.Tags
          matchData = [kw]
          return
        }
        matchData.push(kw)
      }
    })
    // Match title
    for (let j = 0; j < keywords.length; j++) {
      const index = article.title.indexOf(keywords[j])
      if (index !== -1) {
        matchType = MatchType.Title
        const end = index + keywords[j].length
        if (!Array.isArray(matchData) || (Array.isArray(matchData) && matchData.length > 0)) {
          matchData = [new Range(index, end)]
          continue
        }
        matchData.push(new Range(index, end))
      }
    }

    if (matchType !== undefined) {
      result.push(new SearchResult(article, matchType, matchData))
    }
  }
  return result
}

export const getCategory = (name: string | undefined): Category | undefined => {
  if (!name) return undefined
  return metaData.categories.find((category: Category) => category.name === name)
}

export const getCategories = (): Category[] => {
  return metaData.categories
}

export function sortArticlesByTime(articles: Article[], desc: boolean = true): Article[] {
  return articles.sort((a: Article, b: Article) => {
    return desc
      ? Date.parse(b.createdAt) - Date.parse(a.createdAt)
      : Date.parse(a.createdAt) - Date.parse(b.createdAt)
  })
}

export async function fetchArticleStats(slug: string): Promise<ArticleStats> {
  if (!$config.api.articles.stats.enable) {
    return { views: -1 }
  }
  // /api/articles/stats?action=query&slug={slug}
  let resp = await fetch(
    $config.apiBase + $config.api.articles.stats.endpoint + `?action=query&slug=${slug}`
  )
  if (resp.ok) {
    let json = await resp.json()
    if (json?.data?.stats) {
      return json.data.stats
    }
  }
  console.error('Failed to fetch article stats', resp.status, resp.body)
  return { views: -1 }
}
