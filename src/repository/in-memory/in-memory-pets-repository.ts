import type { PetsRepositoryInterface } from '../pets-repository-interface'
import type { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepositoryInterface {
  items: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      ...data,
    }
    this.items.push(pet)
    return pet
  }
}
