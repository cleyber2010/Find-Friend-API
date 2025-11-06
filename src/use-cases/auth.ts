import type { OrganizationRepositoryInterface } from '../repository/organization-repository-interface'
import { compare } from 'bcrypt'

interface AuthUseCaseRequest {
  email: string
  password: string
}

interface AuthUseCaseResponse {
  orgId: string
}

export class AuthUseCase {
  constructor(
    private organizationRepository: OrganizationRepositoryInterface,
  ) {}

  async execute({
    email,
    password,
  }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email)
    if (!organization) {
      throw new Error('Invalid email or password')
    }

    const authLogin = compare(password, organization.password_hash)

    if (!authLogin) {
      throw new Error('Invalid email or password')
    }

    const orgId = organization.id

    return {
      orgId,
    }
  }
}
