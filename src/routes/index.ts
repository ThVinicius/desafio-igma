import { Router } from 'express'
import CustomerRoute from './customerRoute'

const routes = Router()

const customerRouter = new CustomerRoute()

routes.use(customerRouter.router)

export default routes
