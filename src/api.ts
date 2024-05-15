import rawMetaData from '@/_meta.json?raw'
import $config from '@/_config'

import { Type, plainToInstance } from 'class-transformer'

export enum ContentFormat {
  Markdown = 'md'
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
  public name: string
  public description: string
  public color: string

  constructor(name: string, description: string, color: string) {
    this.name = name
    this.description = description
    this.color = color
  }
}

export class MetaData {
  @Type(() => Article)
  public articles: Article[] = []
  @Type(() => Category)
  public categories: Category[] = []
}

export const metaData = plainToInstance(MetaData, JSON.parse(rawMetaData), {})

export const getArticle = (slug: string): Article | undefined => {
  return metaData.articles.find((article: Article) => article.slug === slug)
}

export const utils = {
  textToSlug: (text: string): string => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\p{L}\p{N}-]+/gu, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }
}

export default {
  metaData,
  getArticle
}
