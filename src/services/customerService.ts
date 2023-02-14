import CustomerRepository from '../repositories/customerRepository'
import { ICustomer, ICustomerWithId } from '../types/customerType'
import { ThrowError } from '../utils/throwError'

export default class CustomerService {
  private repository: CustomerRepository

  constructor() {
    this.repository = new CustomerRepository()
  }

  async create(customer: ICustomer): Promise<ICustomerWithId> {
    return await this.repository.create(customer)
  }

  async findAllWithPagination(
    skip: number,
    take: number
  ): Promise<ICustomerWithId[]> {
    return await this.repository.findAllWithPagination(skip, take)
  }

  async findByCpf(cpf: string): Promise<ICustomerWithId> {
    const customer = await this.repository.findByCpf(cpf)

    if (!customer) new ThrowError().notFound('CPF não encontrado')

    return customer!
  }

  getRepository() {
    return this.repository
  }
}
