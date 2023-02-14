import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

export class SchemaValidator {
  use(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const payload = req.body

      const { error } = schema.validate(payload, { abortEarly: false })

      if (error) {
        return res.status(400).send(error.details.map(detail => detail.message))
      }

      return next()
    }
  }
}
