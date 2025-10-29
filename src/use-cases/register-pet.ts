import type { Pet, Photo } from '@prisma/client'
import type { PetsRepositoryInterface } from '../repository/pets-repository-interface'
import type { PhotosRepositoryInterface } from '../repository/photos-repository-interface'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  age: 'filhote' | 'adulto'
  size: 'Pequenino' | 'Medio' | 'Grande'
  energy_level: string
  level_independence: string
  environment: string
  photo: string[] | null
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetsRepositoryInterface,
    private photoRepository: PhotosRepositoryInterface,
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    energy_level,
    level_independence,
    environment,
    photo,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.create({
      name,
      description,
      age,
      size,
      energy_level,
      level_independence,
      environment,
    })

    if (photo) {
      photo.forEach((item) => {
        this.photoRepository.savePhoto({
          pet_id: pet.id,
          photo_name: item,
        })
      })
    }

    return {
      pet,
    }
  }
}
