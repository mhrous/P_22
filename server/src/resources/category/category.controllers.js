import Category from './category.model'

export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find()
      .select('name id')
      .lean()
      .exec()

    res.status(200).json({ data: category })
  } catch (e) {
    res.status(400).end()
  }
}
