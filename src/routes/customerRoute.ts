import { SchemaValidator } from '../middlewares/schemaValidator'
import { Router } from 'express'
import CustomerController from '../controllers/customerController'
import { CpfValidator } from '../middlewares/cpfValidator'
import { CustomerSchema } from '../schemas/customerSchema'

export default class CustomerRoute {
  router: Router
  schemaValidator: SchemaValidator
  cpfValidator: CpfValidator
  controller: CustomerController
  schema: CustomerSchema

  constructor() {
    this.router = Router()
    this.schemaValidator = new SchemaValidator()
    this.schema = new CustomerSchema()
    this.cpfValidator = new CpfValidator()
    this.controller = new CustomerController()
    this.routes()
  }

  routes(): void {
    this.router.post(
      '/api/customers',
      this.schemaValidator.use(this.schema.getCreate()),
      this.cpfValidator.use,
      this.controller.create
    )

    const isQuery = true
    this.router.get(
      '/api/customers',
      this.schemaValidator.use(this.schema.getPagination(), { isQuery }),
      this.controller.findAllWithPagination
    )

    const isParams = true
    this.router.get(
      '/api/customers/:cpf',
      this.schemaValidator.use(this.schema.getFindByCpf(), { isParams }),
      this.controller.findByCpf
    )
  }
}
