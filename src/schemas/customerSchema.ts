import JoiImport from 'joi'
import DateExtension from '@joi/date'
import { ICustomer } from '../types/customerType'

export class CustomerSchema {
  create: JoiImport.ObjectSchema<ICustomer>
  joi: typeof JoiImport

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
  }
}
