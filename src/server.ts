import dotenv from 'dotenv'

import express from 'express'
import 'express-async-errors'
import routes from './routes'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

// middlewares
import ErrorMiddleware from './middlewares/Error'

// database
import connect from './config/database'

// logger
import log from './config/logger'

// dotenv - be able to load .env variables
dotenv.config()

const app = express()
const port = process.env.PORT as unknown as number || 8080
const host = process.env.HOST || 'localhost'

app.use(express.urlencoded({ extended: true })) 
app.use(express.json())
app.use(cors())
app.use(morgan('dev')) // Shows the requests and info about them
app.use(helmet())
app.use('/api/v1', routes)

// Error handling

app.use(ErrorMiddleware)

app
.listen(8080, () => {
  connect()
  log.info('Connected to: ' + host + ':' + port)
})
