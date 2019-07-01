import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
)

categorySchema.statics.createCategory = async function({ name }) {
  try {
    let category = await this.findOne({
      name: name
    })
      .lean()
      .exec()
    if (!category) {
      const newCategory = await this.create({
        name: name
      })
      return newCategory
    }
  } catch (e) {
    console.error(e)
  }
}

export default mongoose.model('Category', categorySchema)
