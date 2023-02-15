import agent from '../config/supertestConfig'
import prisma from '../../src/databases/prisma'
import { Customer } from '../factory/customerFactory'

beforeEach(() => prisma.$queryRaw`TRUNCATE TABLE customers RESTART IDENTITY`)

afterAll(async () => await prisma.$disconnect())

describe('POST /api/customers route tests', () => {
  it('must register a customer if an unregistered and valid CPF is passed', async () => {
    const customer = new Customer()

    const { status, body } = await agent
      .post('/api/customers')
      .send(customer.get())

    expect(status).toEqual(201)
    expect(body).toEqual(customer.withId())
  })

  it('should not register a customer if a registered and valid CPF is passed', async () => {
    const data = new Customer().get()

    await prisma.customer.create({ data })

    const { status } = await agent.post('/api/customers').send(data)

    expect(status).toEqual(409)
  })

  it('must not register a customer if an unregistered and invalid CPF is passed', async () => {
    const customer = new Customer()

    const { status } = await agent
      .post('/api/customers')
      .send(customer.withInvalidCpf())

    expect(status).toEqual(422)
  })
})

describe('GET /api/customers route tests', () => {
  it('must get the first 5 registered customers', async () => {
    const customer = new Customer()
    const data = customer.tenCustomers()
    const firstFiveCustomers = customer.tenCustomersWithId().slice(0, 5)
    const page = 1
    const take = 5

    await prisma.customer.createMany({ data })

    const { status, body } = await agent.get(
      `/api/customers?page=${page}&take=${take}`
    )

    expect(status).toEqual(200)
    expect(body.length).toEqual(5)
    expect(body).toEqual(firstFiveCustomers)
  })

  it('must get the second page of customers', async () => {
    const customer = new Customer()
    const data = customer.tenCustomers()
    const secondPageOfCustomers = customer.tenCustomersWithId().slice(5, 10)
    const page = 2
    const take = 5

    await prisma.customer.createMany({ data })

    const { status, body } = await agent.get(
      `/api/customers?page=${page}&take=${take}`
    )

    expect(status).toEqual(200)
    expect(body.length).toEqual(5)
    expect(body).toEqual(secondPageOfCustomers)
  })
})

describe('GET /api/customers/:cpf route tests', () => {
  it('must obtain the customer if his cpf is passed', async () => {
    const customer = new Customer()
    const data = customer.get()

    await prisma.customer.create({ data })

    const { status, body } = await agent.get(`/api/customers/${data.cpf}`)

    expect(status).toEqual(200)
    expect(body).toEqual(customer.withId())
  })

  it('must not obtain the client if an unregistered CPF is passed', async () => {
    const cpf = '111.444.777-35'

    const { status } = await agent.get(`/api/customers/${cpf}`)

    expect(status).toEqual(404)
  })
})
