import JoiImport from 'joi'
import DateExtension from '@joi/date'
import { ICustomer } from '../types/customerType'
import { IFindById, IPagination } from '../types/joiType'

export class CustomerSchema {
  joi: typeof JoiImport
  create: JoiImport.ObjectSchema<ICustomer>
  findByCpf: JoiImport.ObjectSchema<IFindById>
  pagination: JoiImport.ObjectSchema<IPagination>

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
}
