import { Request, Response } from 'express'
import CustomerService from '../services/customerService'
import { ICustomer } from '../types/customerType'

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
}
