import rawMetaData from '@/_meta_gallery.json?raw'
import { plainToInstance, Type } from 'class-transformer'
import { formatDate } from './util'

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
  public squareThumbnail: string

  constructor(s: string, m: string, l: string, squareS: string) {
    this.s = s
    this.m = m
    this.l = l
    this.squareThumbnail = squareS
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
  public cover: string | null

  constructor(id: string, name: string, description: string, cover: string | null) {
    this.id = id
    this.name = name
    this.description = description
    this.cover = cover
  }

  getPhotos() {
    return getAlbumPhotos(this.id)
  }

  getPhotosByDate(desc: boolean = true) {
    return sortPhotosByDate(getAlbumPhotos(this.id), desc)
  }

  getTimePeriod() {
    let photos = sortPhotosByDate(getAlbumPhotos(this.id), false)

    if (photos.length == 0) {
      return ''
    }
    if (photos.length == 1) {
      return formatDate(photos[0].details.shotAt)
    }

    return (
      formatDate(photos[0].details.shotAt) +
      ' - ' +
      formatDate(photos[photos.length - 1].details.shotAt)
    )
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

  getPhotos() {
    return getCategoryPhotos(this.id)
  }

  getPhotosByDate(desc: boolean = true) {
    return sortPhotosByDate(getCategoryPhotos(this.id), desc)
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

export function getAlbums(): Album[] {
  return metaData.albums
}

export function getCategories(): Category[] {
  return metaData.categories
}

export function getAlbumPhotos(albumId: string): Photo[] {
  return metaData.photos.filter((photo) => photo.album === albumId)
}

export function getCategoryPhotos(categoryId: string): Photo[] {
  return metaData.photos.filter((photo) => photo.categories.includes(categoryId))
}

export function getAlbum(albumId: string): Album {
  return metaData.albums.find((album) => album.id === albumId)!
}

export function sortPhotosByDate(
  photos: Photo[],
  desc: boolean = true /* true: latest first */
): Photo[] {
  if (desc) {
    return photos.sort(
      (a, b) => new Date(b.details.shotAt).getTime() - new Date(a.details.shotAt).getTime()
    )
  }
  return photos.sort(
    (a, b) => new Date(a.details.shotAt).getTime() - new Date(b.details.shotAt).getTime()
  )
}
