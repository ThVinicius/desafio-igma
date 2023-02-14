import { NextFunction, Request, Response } from 'express'

export class ErrorHandling {
  use(error: any, _: Request, res: Response, __: NextFunction) {
    switch (error.code) {
      case 'Not Found':
        return res.status(404).send(error.message)

      case 'Conflit':
        return res.status(409).send(error.message)

      default:
        console.log(error)
        return res.status(500).send(error)
    }
  }
}
