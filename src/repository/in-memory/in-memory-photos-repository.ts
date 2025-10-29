import type { PhotosRepositoryInterface } from '../photos-repository-interface'
import type { Photo, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPhotosRepository implements PhotosRepositoryInterface {
  private items: Photo[] = []
  async savePhoto(data: Prisma.PhotoUncheckedCreateInput) {
    const photos = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(photos)
  }

  async fetchPhotos(id: string): Promise<Photo[]> {
    return this.items.filter((photo) => photo.pet_id === id)
  }
}
