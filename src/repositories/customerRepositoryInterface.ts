import { ICustomer, ICustomerWithId } from '../types/customerType'

export default interface CustomerRepositoryInterface {
  create(data: ICustomer): Promise<ICustomerWithId>

  findByCpf(cpf: string): Promise<ICustomerWithId | null>

  findAllWithPagination(skip: number, take: number): Promise<ICustomerWithId[]>
}
