import type { Pet } from '@prisma/client'
import type { PetsRepositoryInterface } from '../repository/pets-repository-interface'
import type { PhotosRepositoryInterface } from '../repository/photos-repository-interface'

interface PetRegisterUseCaseRequest {
  name: string
  description: string
  age: 'filhote' | 'adulto'
  size: 'Pequenino' | 'Medio' | 'Grande'
  energyLevel: string
  levelIndependence: string
  environment: string
  photos?: string[]
  organizationId: string
}

interface PetRegisterUseCaseResponse {
  pet: Pet
}

export class PetRegisterUseCase {
  constructor(
    private petsRepository: PetsRepositoryInterface,
    private photosRepository: PhotosRepositoryInterface,
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    levelIndependence,
    environment,
    photos,
    organizationId,
  }: PetRegisterUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy_level: energyLevel,
      level_independence: levelIndependence,
      environment,
      organization_id: organizationId,
    })
    if (photos) {
      photos.forEach((photo) => {
        this.photosRepository.create({
          pet_id: pet.id,
          photo_name: photo,
        })
      })
    }

    return {
      pet,
    }
  }
}
