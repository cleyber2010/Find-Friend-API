import type { Organization } from '@prisma/client'
import { OrganizationUseCase } from '../use-cases/organization'
import { InMemoryOrganizationRepository } from '../repository/in-memory/in-memory-organization-repository'
import { InMemoryAddressRepository } from '../repository/in-memory/in-memory-address-repository'

export async function createOrganization(): Promise<Organization> {
  const organizationRepository = new InMemoryOrganizationRepository()
  const addressRepository = new InMemoryAddressRepository()
  const organizationUseCase = new OrganizationUseCase(
    organizationRepository,
    addressRepository,
  )
  const { organization } = await organizationUseCase.execute({
    responsible_name: 'Jonh Doe',
    email: 'jonhdoe@example.com',
    password: '123456',
    street: 'Rua 127 Quadra 304 Lote 05',
    cep: '72930000',
    phone: '65998764532',
    city: 'Brasilia',
    state: 'DF',
  })

  return organization
}
