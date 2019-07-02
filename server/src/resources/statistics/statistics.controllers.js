import Statistics from './statistics.model'

export const getStatistics = async (req, res) => {
  try {
    const { userId } = req.params

    const statistics = await Statistics.find({ userId })
      .select('index statistics _id')
      .lean()
      .exec()

    res.status(200).json({ data: statistics })
  } catch (e) {
    res.status(400).end()
  }
}
