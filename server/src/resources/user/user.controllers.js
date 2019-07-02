import User from './user.model'

export const me = (req, res) => {
  res.status(200).json({ data: req.user })
}

export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec()

    res.status(200).json({ data: user })
  } catch (e) {
    res.status(400).end()
  }
}

export const getAllUsers = async (req, res) => {
  try {
    console.log(5)
    const user = await User.find({})
      .select('-password -online -busy')
      .lean()
      .exec()

    res.status(200).json({ data: user })
  } catch (e) {
    res.status(400).end()
  }
}

export const getUsers = async (req, res) => {
  try {
    const { userId } = req.params

    console.log(5)
    const user = await User.findById(userId)
      .select('-password -online -busy')
      .lean()
      .exec()

    res.status(200).json({ data: user })
  } catch (e) {
    res.status(400).end()
  }
}
