import type { Organization } from '@prisma/client'
import type { OrganizationRepositoryInterface } from '../repository/organization-repository-interface'
import type { AddressRepositoryInterface } from '../repository/address-repository-interface'
import { hash } from 'bcrypt'

interface OrganizationUseCaseRequest {
  responsible_name: string
  email: string
  phone: string
  password: string
  street: string
  cep: string
  city: string
  state: string
}

interface OrganizationUseCaseResponse {
  organization: Organization
}

export class OrganizationUseCase {
  constructor(
    private organizationsRepository: OrganizationRepositoryInterface,
    private addressessRepository: AddressRepositoryInterface,
  ) {}

  async execute({
    responsible_name,
    email,
    phone,
    password,
    street,
    cep,
    city,
    state,
  }: OrganizationUseCaseRequest): Promise<OrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      responsible_name,
      email,
      phone,
      password_hash,
    })

    await this.addressessRepository.create({
      organization_id: organization.id,
      street,
      cep,
      city,
      state,
    })

    return {
      organization,
    }
  }
}
