import prisma from '../databases/prisma'
import { ICustomer, ICustomerWithId } from '../types/customerType'
import CustomerRepositoryInterface from './customerRepositoryInterface'

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(data: ICustomer): Promise<ICustomerWithId> {
    return await prisma.customer.create({ data })
  }

  async findAllWithPagination(
    skip: number,
    take: number
  ): Promise<ICustomerWithId[]> {
    return await prisma.customer.findMany({
      take,
      skip,
      orderBy: {
        id: 'asc'
      }
    })
  }

  async findByCpf(cpf: string): Promise<ICustomerWithId | null> {
    return await prisma.customer.findUnique({ where: { cpf } })
  }
}
