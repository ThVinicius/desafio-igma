import JoiImport from 'joi'
import DateExtension from '@joi/date'
import { ICustomer } from '../types/customerType'
import { IFindById, IPagination } from '../types/joiType'

export class CustomerSchema {
  private joi: typeof JoiImport
  private create: JoiImport.ObjectSchema<ICustomer>
  private findByCpf: JoiImport.ObjectSchema<IFindById>
  private pagination: JoiImport.ObjectSchema<IPagination>

  constructor() {
    this.joi = JoiImport.extend(DateExtension)

    this.create = this.joi.object({
      name: this.joi.string().trim().required(),
      cpf: this.joi
        .string()
        .pattern(/\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}/)
        .required(),
      dateOfBirth: this.joi.date().format('DD/MM/YYYY').required()
    })

    this.findByCpf = this.joi.object({
      cpf: this.joi
        .string()
        .pattern(/\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11}/)
        .required()
    })

    this.pagination = this.joi.object({
      page: this.joi.number().greater(0),
      take: this.joi.number().greater(0)
    })
  }

  getCreate() {
    return this.create
  }

  getFindByCpf() {
    return this.findByCpf
  }

  getPagination() {
    return this.pagination
  }
}
