import type { AddressRepositoryInterface } from '../address-repository-interface'
import { type Address, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressRepository implements AddressRepositoryInterface {
  private items: Address[] = []
  async create(data: Prisma.AddressUncheckedCreateInput) {
    const address = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(address)
  }

  async findByAddress(addressId: string){
    const address = this.items.find(
      (address) => address.organization_id === addressId,
    )
    if (!address) {
      return null
    }
    return address
  }
}
