import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  question: {
    type: String,
    unique: true,
    requried: true
  },
  incorrect_answers: {
    type: Array,
    required: true
  },
  correct_answer: {
    type: String,
    required: true
  }
})

questionSchema.statics.getQuestion = async function(difficulty, categories) {
  const data = await this.aggregate([
    {
      $match: {
        $and: [{ difficulty: difficulty }, { category: { $in: categories } }]
      }
    },
    { $sample: { size: 10 } }
  ])
  if (data) return data
}

questionSchema.statics.createQuestion = async function(obj) {
  try {
    const isExist = await this.findOne({
      question: obj.question
    })
      .lean()
      .exec()

    if (!isExist) {
      const newQuestion = await this.create(obj)
      return newQuestion
    }
  } catch (e) {
    throw new Error(e)
  }
}

export default mongoose.model('Question', questionSchema)
