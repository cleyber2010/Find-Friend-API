import { type Address, Prisma } from '@prisma/client'

export interface AddressRepositoryInterface {
  create(data: Prisma.AddressUncheckedCreateInput): Promise<void>
  findByAddress(organizationId: string): Promise<Address | null>
}
