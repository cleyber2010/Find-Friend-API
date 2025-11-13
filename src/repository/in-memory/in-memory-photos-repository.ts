import type { PhotosRepositoryInterface } from '../photos-repository-interface'
import { type Photo, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPhotosRepository implements PhotosRepositoryInterface {
  private items: Photo[] = []

  async create(data: Prisma.PhotoUncheckedCreateInput) {
    const photo = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(photo)
    return photo
  }
}
