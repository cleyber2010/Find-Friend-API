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
}
