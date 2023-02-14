import { ICustomer, ICustomerWithId } from '../types/customerType'

export default interface CustomerRepositoryInterface {
  create(data: ICustomer): Promise<ICustomerWithId>
}
