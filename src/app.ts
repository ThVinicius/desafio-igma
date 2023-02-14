import express, { json } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import { PrismaErrorHandling } from './errors/prismaErrorHandling'
import { ErrorHandling } from './errors/errorHandling'

const app = express()

app.use(cors())
app.use(json())

app.use(routes)
app.use(new PrismaErrorHandling().use)
app.use(new ErrorHandling().use)

export default app
