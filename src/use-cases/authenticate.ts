import type { OrganizationRepositoryInterface } from '../repository/organization-repository-interface'
import { compare } from 'bcrypt'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  orgId: string
}

export class AuthenticateUseCase {
  constructor(
    private organizationRepository: OrganizationRepositoryInterface,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email)
    if (!organization) {
      throw new Error('Invalid email or password')
    }

    const authLogin = await compare(password, organization.password_hash)

    if (!authLogin) {
      throw new Error('Invalid email or password')
    }

    const orgId = organization.id

    return {
      orgId,
    }
  }
}
