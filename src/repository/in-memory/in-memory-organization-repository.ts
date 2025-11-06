import type { OrganizationRepositoryInterface } from '../organization-repository-interface'
import type { Prisma, Organization } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationRepository
  implements OrganizationRepositoryInterface
{
  private items: Organization[] = []

  async create(
    organization: Prisma.OrganizationCreateInput,
  ): Promise<Organization> {
    const organizations = {
      id: randomUUID(),
      ...organization,
      created_at: new Date(),
    }
    this.items.push(organizations)

    return organizations
  }

  async findById(id: string){
    const organization = this.items.find((item) => item.id === id)
    if (!organization) {
      return null
    }
    return organization
  }
}
