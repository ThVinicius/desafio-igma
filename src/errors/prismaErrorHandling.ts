import { Request, Response, NextFunction } from 'express'

export class PrismaErrorHandling {
  use(error: any, _: Request, res: Response, next: NextFunction) {
    switch (error.code) {
      case 'P2002':
        const CONFLIT = 409

        const keyConflit = error.meta.target[0]

        const message = `Esse ${keyConflit} já esta em uso!`

        return res.status(CONFLIT).send(message)

      default:
        next(error)
    }
  }
}
