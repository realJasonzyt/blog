import rawMetaData from '@/_articles/meta.json?raw'
import { plainToInstance } from 'class-transformer'

export interface IArticle {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  tags: string[]
  category: string
  content: IContent
  author: IAuthor

  fetch(): Promise<Response>
}

export interface IAuthor {
  name: string
  location: string
  avatar: string
}

export interface ICategory {
  name: string
  description: string
  color: string
}

export enum ContentFormat {
  Mdx = 'mdx'
}

export interface IContent {
  format: ContentFormat
  url: string
}

export class Article implements IArticle {
  public id: string
  public title: string
  public tags: string[]
  public category: string
  public content: IContent
  public author: IAuthor
  public createdAt: string
  public updatedAt: string

  constructor(
    id: string,
    title: string,
    tags: string[],
    category: string,
    content: IContent,
    author: IAuthor,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id
    this.title = title
    this.tags = tags
    this.category = category
    this.content = content
    this.author = author
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static create(
    id: string,
    title: string,
    tags: string[],
    category: string,
    content: IContent,
    author: IAuthor
  ) {
    const now = new Date().toISOString()
    return new Article(id, title, tags, category, content, author, now, now)
  }

  fetch() {
    return fetch(new URL(this.content.url, import.meta.url))
  }
}

export class Author implements IAuthor {
  public name: string
  public location: string
  public avatar: string

  constructor(name: string, location: string = '', avatar: string = '') {
    this.name = name
    this.location = location
    this.avatar = avatar
  }
}

export class Content implements IContent {
  public format: ContentFormat
  public url: string

  constructor(format: ContentFormat, url: string) {
    this.format = format
    this.url = url
  }
}

export class MetaData {
  public articles: IArticle[] = []
  public categories: ICategory[] = []
}

export const metaData = plainToInstance(MetaData, JSON.parse(rawMetaData))

export const getArticle = (id: string): IArticle | undefined => {
  return metaData.articles.find((article: IArticle) => article.id === id)
}

export default {
  metaData,
  getArticle
}
