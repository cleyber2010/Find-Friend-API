import type { Prisma, Photo } from '@prisma/client'

export interface PhotosRepositoryInterface {
  create(data: Prisma.PhotoUncheckedCreateInput): Promise<Photo>
}
