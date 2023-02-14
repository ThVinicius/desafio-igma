import prisma from '../databases/prisma'
import { ICustomer, ICustomerWithId } from '../types/customerType'
import CustomerRepositoryInterface from './customerRepositoryInterface'

export default class CustomerRepository implements CustomerRepositoryInterface {
  public async create(data: ICustomer): Promise<ICustomerWithId> {
    return await prisma.customer.create({ data })
  }
}
