import faker from 'faker'
import { UserDB } from '../resources'

const generateRandomColor = () =>
  `rgb(${Math.floor(Math.random() * 240)},${Math.floor(
    Math.random() * 240
  )},${Math.floor(Math.random() * 240)})`

const userCount = 25

export default async () => {
  for (let i = 0; i < userCount; i++) {
    var name = faker.name.findName()
    var email = faker.internet.email()
    const password = faker.internet.password()
    const color = generateRandomColor()
    console.log({ name, password, email, color })
    try {
      const data = await UserDB.create({ name, password, email, color })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
}
