import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  players: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  playersCount: {
    type: Number,
    default: 0
  },
  maxPlayers: {
    type: Number,
    default: 2
  },

  status: {
    type: String,
    enum: ['waiting', 'full', 'running', 'finished'],
    default: 'waiting'
  },
  points: {
    type: Number,
    default: 100
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  categories: [
    {
      type: String
    }
  ]
})

roomSchema.statics.createRoom = async function({
  name,
  maxPlayers,
  points,
  user,
  categories,
  difficulty
}) {
  try {
    const userRoom = await this.findOne({
      $and: [
        {
          $or: [
            {
              status: 'running'
            },
            {
              status: 'waiting'
            }
          ]
        },
        {
          players: user._id
        }
      ]
    })
    if (userRoom) {
      throw new Error("Can't join more than one room ")
    }
    console.log('asdasd', user, points)
    if (user.points < points) {
      throw new Error('Not enough points')
    }

    const room = await this.create({
      name,
      maxPlayers,

      points,
      categories: categories.map(i => mongoose.Types.ObjectId(i)),
      difficulty
    })
    if (room) {
      room.players.addToSet({
        user: user._id,
        points,
        isAdmin: true
      })
      room.playersCount++
      const savedRoom = await room.save()
      if (savedRoom) {
        return this.findById(savedRoom._id)
          .populate('players')
          .lean()
          .exec()
      }
    }
  } catch (e) {
    return e
  }
}

roomSchema.statics.getRooms = async function() {
  const room = await this.find({
    $or: [
      {
        status: 'waiting'
      }
    ]
  })
    .populate('players ', 'name _id')
    .lean()
    .exec()
  return room
}

roomSchema.statics.findRoom = async function(roomID) {
  const room = await this.findOne({
    _id: mongoose.Types.ObjectId(roomID)
  })
    .populate('players', 'name _id')
    .lean()
    .exec()

  return room
}

roomSchema.statics.joinRoom = async function(roomId, user) {
  const room = await this.findOne({
    status: 'waiting',
    _id: mongoose.Types.ObjectId(roomId)
  })
  if (!room) {
    throw new Error('Room not found')
  }
  if (room.maxPlayers < room.playersCount + 1) {
    throw new Error('Room is full')
  }

  const userRoom = await this.findOne({
    $or: [
      {
        status: 'running'
      },
      {
        status: 'waiting'
      }
    ],
    players: user._id
  })
  if (userRoom) {
    throw new Error('Cant join more than one room ')
  }
  if (user.points < room.points) {
    throw new Error("You don't have enough points ")
  }
  room.players.addToSet({
    user: user
  })
  room.playersCount += 1
  await room.save()
  const Myroom = await this.findById(room._id)
    .populate('players', 'name _id')
    .lean()
    .exec()
  return Myroom
}

roomSchema.statics.findRoomByUserId = async function(userId) {
  const room = await this.findOne({
    $and: [
      {
        $or: [
          {
            status: 'running'
          },
          {
            status: 'waiting'
          }
        ]
      },
      {
        players: userId
      }
    ]
  })
    .populate('players', 'name _id')
    .lean()
    .exec()
  return room
}

roomSchema.statics.getRoomById = async function(roomId, user) {
  const userRoom = await this.findOne({
    $and: [
      {
        $or: [
          {
            status: 'running'
          },
          {
            status: 'waiting'
          }
        ]
      },
      {
        'players.user': user,
        _id: mongoose.Types.ObjectId(roomId)
      }
    ]
  })
    .populate('players.user', '-password')
    .populate('categories')
  if (!userRoom) throw new Error('The game is finished')
  return userRoom
}

roomSchema.statics.getRoom = async function(roomId) {
  const userRoom = await this.findOne({
    $and: [
      {
        $or: [
          {
            status: 'running'
          },
          {
            status: 'waiting'
          }
        ]
      },
      {
        _id: mongoose.Types.ObjectId(roomId)
      }
    ]
  })
    .populate('players.user', '-password')
    .populate('categories')
  if (!userRoom) throw new Error('The game is finished')
  return userRoom
}

roomSchema.statics.leaveRoom = async function({ roomId, userId }) {
  const room = await this.update(
    {
      _id: roomId
    },
    {
      $pull: {
        players: { user: mongoose.Types.ObjectId(userId) }
      },
      $inc: { playersCount: -1 }
    }
  )
  if (room) {
    const myRoom = await this.findById(roomId)
      .populate('players.user', '-password')
      .populate('categories')
    return myRoom
  }
}

roomSchema.statics.endGame = async function endGame({ roomId }) {
  const room = await this.deleteOne({
    _id: roomId
  })
  if (!room) throw new Error('Room Not Found')
}

roomSchema.statics.updateStatus = async function({ roomId, status }) {
  const room = await this.update(
    {
      _id: roomId
    },
    {
      status
    }
  )
  return room
}

export default mongoose.model('Room', roomSchema)
