import mongoose from 'mongoose'
import options from '../config'

export const ConnectDB = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useCreateIndex: true,
    useNewUrlParser: true
  })
}
