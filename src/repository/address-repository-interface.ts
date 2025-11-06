import { Prisma } from '@prisma/client'

export interface AddressRepositoryInterface {
  create(data: Prisma.AddressUncheckedCreateInput): Promise<void>
}
