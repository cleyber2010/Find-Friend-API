import type { Pet } from '@prisma/client'
import type { PetsRepositoryInterface } from '../repository/pets-repository-interface'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  age: 'filhote' | 'adulto'
  size: 'Pequenino' | 'Medio' | 'Grande'
  energy_level: string
  level_independence: string
  environment: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetsRepositoryInterface) {}
  async execute({
    name,
    description,
    age,
    size,
    energy_level,
    level_independence,
    environment,
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

    return {
      pet,
    }
  }
}
