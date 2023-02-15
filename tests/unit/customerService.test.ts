import CustomerService from '../../src/services/customerService'
import { Customer } from '../factory/customerFactory'

describe('create method tests', () => {
  it('must register a customer', async () => {
    const service = new CustomerService()
    const repository = service.getRepository()
    const customer = new Customer()

    jest.spyOn(repository, 'create').mockResolvedValueOnce(customer.withId())

    const response = await service.create(customer.get())

    expect(response).toEqual(customer.withId())
    expect(repository.create).toBeCalled()
  })
})

describe('findAllWithPagination method tests', () => {
  it('must get all customers', async () => {
    const service = new CustomerService()
    const repository = service.getRepository()
    const customer = new Customer()
    const skip = 0
    const take = 10

    jest
      .spyOn(repository, 'findAllWithPagination')
      .mockResolvedValueOnce([customer.withId()])

    const response = await service.findAllWithPagination(skip, take)

    expect(response).toEqual([customer.withId()])
    expect(repository.findAllWithPagination).toBeCalled()
  })
})

describe('findByCpf method tests', () => {
  it('must obtain the customer if his cpf is passed', async () => {
    const service = new CustomerService()
    const repository = service.getRepository()
    const customer = new Customer()

    jest.spyOn(repository, 'findByCpf').mockResolvedValueOnce(customer.withId())

    const response = await service.findByCpf(customer.withId().cpf)

    expect(response).toEqual(customer.withId())
    expect(repository.findByCpf).toBeCalled()
  })

  it('must not obtain the client if a registered cpf is not passed', async () => {
    const service = new CustomerService()
    const repository = service.getRepository()
    const customer = new Customer()

    jest.spyOn(repository, 'findByCpf').mockResolvedValueOnce(null)

    const promise = service.findByCpf(customer.get().cpf)

    expect(promise).rejects.toEqual({
      code: 'Not Found',
      message: 'CPF não encontrado'
    })
    expect(repository.findByCpf).toBeCalled()
  })
})
