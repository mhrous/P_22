import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { signup, signin, ConnectDB } from './utils'
import { userRouter, categoryRouter, statisticsRouter } from './resources'

export const app = express()

app.disable('x-powered-by')
app.disable('etag')
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/api/signup', signup)
app.post('/api/signin', signin)
app.use('/api/category', categoryRouter)
app.use('/api/statistics', statisticsRouter)

app.use('/api/users', userRouter)

export const start = async () => {
  try {
    await ConnectDB()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
