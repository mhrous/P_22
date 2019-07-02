import mongoose from 'mongoose'

const statisticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId
    },

    statistics: {
      type: Array
    },
    index: {
      type: Number
    }
  },
  { timestamps: true }
)

export default mongoose.model('statistics', statisticsSchema)
