export interface ICustomer {
  name: string
  cpf: string
  dateOfBirth: string
}

export interface ICustomerWithId extends ICustomer {
  id: number
}
