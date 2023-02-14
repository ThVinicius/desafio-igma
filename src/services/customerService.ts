import CustomerRepository from '../repositories/customerRepository'
import { ICustomer, ICustomerWithId } from '../types/customerType'

export default class CustomerService {
  private repository: CustomerRepository

  constructor() {
    this.repository = new CustomerRepository()
  }

  async create(customer: ICustomer): Promise<ICustomerWithId> {
    return await this.repository.create(customer)
  }
}
