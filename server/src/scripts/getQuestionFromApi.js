import request from 'request'
import { QuestionDB, CategoryDB } from '../resources'

const apiEndPoint = 'https://opentdb.com/api.php?amount=50&type=multiple'

const loopCount = 1000

const getData = () => {
  for (let i = 0; i < loopCount; i++) {
    request(apiEndPoint, async (error, response, body) => {
      if (error) {
        console.log(error)
        return
      }
      let results = JSON.parse(body).results

      for (let i = 0; i < results.length; i++) {
        try {
          results[i].category = results[i].category.replace(
            'Entertainment: ',
            ''
          )
          await QuestionDB.createQuestion(results[i])
          await CategoryDB.createCategory({
            name: results[i].category
          })
        } catch (e) {
          console.log(e)
        }
      }
      console.log(i)
    })
  }
}

export default getData
