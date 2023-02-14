import { Request, Response } from 'express'
import CustomerService from '../services/customerService'
import { ICustomer } from '../types/customerType'
import { Cpf } from '../utils/cpf'

export default class CustomerController {
  private static service: CustomerService

  constructor() {
    CustomerController.service = new CustomerService()
  }

  async create(req: Request, res: Response) {
    const body = req.body as ICustomer

    const customer = await CustomerController.service.create(body)

    return res.status(201).send(customer)
  }

  async findAllWithPagination(req: Request, res: Response) {
    const page = Number(req.query.page) || 1
    const take = Number(req.query.take) || 10
    const skip = (page - 1) * take

    const customers = await CustomerController.service.findAllWithPagination(
      skip,
      take
    )

    return res.status(200).send(customers)
  }

  async findByCpf(req: Request, res: Response) {
    const cpf = new Cpf(req.params.cpf).withPunctuation()

    const customer = await CustomerController.service.findByCpf(cpf)

    return res.status(200).send(customer)
  }
}
