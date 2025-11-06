import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryOrganizationRepository } from '../repository/in-memory/in-memory-organization-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcrypt'

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateUseCase(organizationRepository)
  })

  it('must be possible to authenticate organization', async () => {
    await organizationRepository.create({
      responsible_name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '65998764532',
    })

    const { orgId } = await sut.execute({
      email: 'jonhdoe@example.com',
      password: '123456',
    })

    expect(orgId).toEqual(expect.any(String))
  })
})
