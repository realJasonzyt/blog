import rawMetaData from '@/_meta_gallery.json?raw'
import { plainToInstance, Type } from 'class-transformer'

export class Camera {
  public make: string
  public model: string

  constructor(make: string, model: string) {
    this.make = make
    this.model = model
  }
}

export class Lens {
  public make: string
  public model: string

  constructor(make: string, model: string) {
    this.make = make
    this.model = model
  }
}

export class PhotoDetails {
  public shotAt: string
  public location: string
  @Type(() => Camera)
  public camera: Camera
  @Type(() => Lens)
  public lens: Lens
  public focalLength: number
  public aperture: number
  public iso: number
  public shutterSpeed: number

  constructor(
    shotAt: string,
    location: string,
    camera: Camera,
    lens: Lens,
    focalLength: number,
    aperture: number,
    iso: number,
    shutterSpeed: number
  ) {
    this.shotAt = shotAt
    this.location = location
    this.camera = camera
    this.lens = lens
    this.focalLength = focalLength
    this.aperture = aperture
    this.iso = iso
    this.shutterSpeed = shutterSpeed
  }
}

export class PhotoURLs {
  public s: string
  public m: string
  public l: string

  constructor(s: string, m: string, l: string) {
    this.s = s
    this.m = m
    this.l = l
  }
}

export class Photo {
  @Type(() => PhotoURLs)
  public url: PhotoURLs
  public description: string
  public album: string
  public categories: string[]
  public author: string
  @Type(() => PhotoDetails)
  public details: PhotoDetails

  constructor(
    url: PhotoURLs,
    description: string,
    album: string,
    categories: string[],
    author: string,
    details: PhotoDetails
  ) {
    this.url = url
    this.description = description
    this.album = album
    this.categories = categories
    this.author = author
    this.details = details
  }
}

export class Album {
  public id: string
  public name: string
  public description: string
  public createdAt: string
  public updatedAt: string
  public cover: string | null

  constructor(
    id: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    cover: string | null
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.cover = cover
  }
}

export class Category {
  public id: string
  public name: string
  public description: string

  constructor(id: string, name: string, description: string) {
    this.id = id
    this.name = name
    this.description = description
  }
}

export class GalleryMetaData {
  @Type(() => Photo)
  public photos: Photo[] = []
  @Type(() => Album)
  public albums: Album[] = []
  @Type(() => Category)
  public categories: Category[] = []
}

export const metaData = plainToInstance(GalleryMetaData, JSON.parse(rawMetaData), {})

export function getPhotos(): Photo[] {
  return metaData.photos
}
