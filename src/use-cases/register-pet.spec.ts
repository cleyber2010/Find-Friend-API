import { it, expect, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repository/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryPhotosRepository } from '../repository/in-memory/in-memory-photos-repository'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryPhotosRepository: InMemoryPhotosRepository
let sut: RegisterPetUseCase

describe('Pets Register Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryPhotosRepository = new InMemoryPhotosRepository()
    sut = new RegisterPetUseCase(
      inMemoryPetsRepository,
      inMemoryPhotosRepository,
    )
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
      photo: null,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  it('must be possible to register a pet with photos', async () => {
    const { pet } = await sut.execute({
      name: 'pet-01',
      description: 'pet description',
      age: 'filhote',
      size: 'Pequenino',
      energy_level: 'Baixa',
      level_independence: 'Baixo',
      environment: 'Ambiente amplo',
      photo: ['photo-1', 'photo-2', 'photo-3'],
    })
    const photos = await inMemoryPhotosRepository.fetchPhotos(pet.id)

    expect(photos).toHaveLength(3)
  })
})
