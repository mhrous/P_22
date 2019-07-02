import { UserDB, CategoryDB, StatisticsDB } from '../resources'

const numberGame = 75

const getArrayRandom = num => {
  let a, b
  if (num === 1) return [10]
  if (num === 2) {
    a = Math.floor(Math.random() * 9 + 1)
    return [a, 10 - a]
  }
  a = Math.floor(Math.random() * 8 + 1)
  b = Math.floor(Math.random() * (9 - a) + 1)
  return [a, b, 10 - a - b]
}

export default async () => {
  for (let i = 0; i < numberGame; i++) {
    const allCategory = await CategoryDB.find({})
      .limit(10)
      .select('name')
      .lean()
      .exec()
    let allUser = await UserDB.find({})
      .select('name email')
      .lean()
      .exec()

    for (let user of allUser) {
      const index = i
      const numCategory = Math.floor(Math.random() * 3 + 1)
      const numQuestion = getArrayRandom(numCategory)
      let numTrue = 0
      let numFalse = 0
      let used = {}
      let statistics = []

      for (let num of numQuestion) {
        let randomCategory = null
        let a = Math.floor(Math.random() * (num - 1) + 1)
        let b = num - a
        numTrue += a
        numFalse += b
        while (true) {
          randomCategory =
            allCategory[Math.floor(Math.random() * allCategory.length)]
          if (!used[randomCategory.name]) {
            used[randomCategory.name] = true
            break
          }
        }
        statistics.push([randomCategory.name, a, b])
      }
      await StatisticsDB.create({ statistics, index, userId: user._id })
      await UserDB.updatePoints(user._id, numTrue * 2)
      await UserDB.updateNumTrue(user._id, numTrue)
      await UserDB.updateNumFalse(user._id, numFalse)
    }
  }
}
