import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repository/in-memory/in-memory-pets-repository'
import { InMemoryPhotosRepository } from '../repository/in-memory/in-memory-photos-repository'
import { PetRegisterUseCase } from './petRegister'
import { createOrganization } from '../utils/create-organization'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryPhotosRepository: InMemoryPhotosRepository
let sut: PetRegisterUseCase

describe('Pets Register', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryPhotosRepository = new InMemoryPhotosRepository()
    sut = new PetRegisterUseCase(
      inMemoryPetsRepository,
      inMemoryPhotosRepository,
    )
  })

  it('must be possible to register a pet', async () => {
    const organization = await createOrganization()
    const { pet } = await sut.execute({
      name: 'pet-01',
      description: 'pet description',
      age: 'filhote',
      size: 'Pequenino',
      photos: ['photo-01', 'photo-02'],
      environment: 'Amplo',
      energyLevel: 'Baixa',
      levelIndependence: 'Baixo',
      organizationId: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
