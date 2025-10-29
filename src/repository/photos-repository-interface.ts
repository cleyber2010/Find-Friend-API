import { type Photo, Prisma } from '@prisma/client'

export interface PhotosRepositoryInterface {
  savePhoto(data: Prisma.PhotoUncheckedCreateInput): Promise<void>
  fetchPhotos(petId: string): Promise<Photo[]>
}
