import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repository/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Pets Register Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(inMemoryPetsRepository)
  })

  it('must be possible to register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'pet-01',
      description: 'pet description',
      age: 'filhote',
      size: 'Pequenino',
      energy_level: 'Baixa',
      level_independence: 'Baixo',
      environment: 'Ambiente amplo',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
