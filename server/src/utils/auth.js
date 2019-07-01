import config from '../config'
import { UserDB } from '../resources'
import jwt from 'jsonwebtoken'

const generateRandomColor = () =>
  `rgb(${Math.floor(Math.random() * 240)},${Math.floor(
    Math.random() * 240
  )},${Math.floor(Math.random() * 240)})`

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }
  try {
    req.body.color = generateRandomColor()

    const user = await UserDB.create(req.body)

    const token = newToken(user)
    console.log(token)
    return res.status(201).json({
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          points: user.point,
          color: user.color
        }
      }
    })
  } catch (e) {
    console.error(e)
    return res.status(500).end()
  }
}

export const signin = async (req, res) => {
  console.log(req.body, 'cccccccccccccc')

  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  const invalid = { message: 'Invalid email and passoword combination' }

  try {
    const user = await UserDB.findOne({ email: req.body.email }).exec()

    if (!user) {
      return res.status(401).send(invalid)
    }

    const match = await user.checkPassword(req.body.password)

    if (!match) {
      return res.status(401).send(invalid)
    }

    const token = newToken(user)
    return res.status(201).json({
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          points: user.point,
          color: user.color
        }
      }
    })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization
  console.log(req.body, 'nnnnnnnnnnnnnnnnnnn')

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await UserDB.findById(payload.id)
    .select('-password')
    .lean()
    .exec()

  if (!user) {
    return res.status(401).end()
  }

  req.user = user
  next()
}
