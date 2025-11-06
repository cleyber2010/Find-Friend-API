import { type Organization, Prisma } from '@prisma/client'

export interface OrganizationRepositoryInterface {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
