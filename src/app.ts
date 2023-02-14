import express, { json } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'
import { PrismaErrorHandling } from './errors/prismaErrorHandling'

const app = express()

app.use(cors())
app.use(json())

app.use(routes)
app.use(new PrismaErrorHandling().use)

export default app
