import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String
    },
    online: {
      type: Boolean,
      default: 0
    },
    busy: {
      type: Boolean,
      default: 1
    },
    points: {
      type: Number,
      default: 50
    },
    color: {
      type: String
    },

    numTrue: {
      type: Number,
      default: 0
    },
    numFalse: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}

userSchema.statics.updatePoints = async function(id, points) {
  return this.findOne({ _id: id }).then(user => {
    user.points = points + user.points
    return user.save()
  })
}

userSchema.statics.updateNumTrue = async function(id, numTrue) {
  return this.findOne({ _id: id }).then(user => {
    user.numTrue = numTrue + user.points
    return user.save()
  })
}
userSchema.statics.updateNumFalse = async function(id, numFalse) {
  return this.findOne({ _id: id }).then(user => {
    user.numFalse = numFalse + user.points
    return user.save()
  })
}

export default mongoose.model('user', userSchema)
