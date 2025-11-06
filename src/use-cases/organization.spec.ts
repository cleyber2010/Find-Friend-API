import { it, describe, expect, beforeEach, afterEach } from 'vitest'
import { InMemoryOrganizationRepository } from '../repository/in-memory/in-memory-organization-repository'
import { InMemoryAddressRepository } from '../repository/in-memory/in-memory-address-repository'
import { OrganizationUseCase } from './organization'

let organizationRepository: InMemoryOrganizationRepository
let addressRepository: InMemoryAddressRepository
let sut: OrganizationUseCase

describe('Organization Use Case', () => {
  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new OrganizationUseCase(organizationRepository, addressRepository)
  })

  it('must be possible to register an organization', async () => {
    const { organization } = await sut.execute({
      responsible_name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
      street: 'Rua 127 Quadra 304 Lote 05',
      cep: '72930000',
      phone: '65998764532',
      city: 'Brasilia',
      state: 'DF',
    })

    expect(organization).toEqual(
      expect.objectContaining({
        responsible_name: 'Jonh Doe',
      }),
    )
  })

  it('must be possible to get the address of the organization', async () => {
    const { organization } = await sut.execute({
      responsible_name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
      street: 'Rua 127 Quadra 304 Lote 05',
      cep: '72930000',
      phone: '65998764532',
      city: 'Brasilia',
      state: 'DF',
    })

    const address = await addressRepository.findByAddress(organization.id)

    expect(organization).toEqual(
      expect.objectContaining({
        responsible_name: 'Jonh Doe',
      }),
    )

    expect(address).toEqual(
      expect.objectContaining({
        street: 'Rua 127 Quadra 304 Lote 05',
      }),
    )
  })
})
