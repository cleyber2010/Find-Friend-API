import type { Prisma, Pet } from '@prisma/client'

export interface PetsRepositoryInterface {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
