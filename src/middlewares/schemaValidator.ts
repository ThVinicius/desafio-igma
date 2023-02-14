import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

interface IRequest {
  isParams?: boolean
}

export class SchemaValidator {
  use(schema: ObjectSchema, request?: IRequest) {
    let payload

    return (req: Request, res: Response, next: NextFunction) => {
      if (request?.isParams) payload = req.params
      else payload = req.body

      const { error } = schema.validate(payload, { abortEarly: false })

      if (error) {
        return res.status(400).send(error.details.map(detail => detail.message))
      }

      return next()
    }
  }
}
