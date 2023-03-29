const {Schema} = require('mongoose')
const mongoose = require('mongoose')

const UserSchema = new Schema({
  id: String,
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  profilePicture: {
    type: String,
  },
  customURL: String,
  thirdParty: {
    type: [String],
    require: true
  },
  updateDate: Date,
  description: String,
  gameLibrary: {
    type: [String],
    default: []
  },
  isDeveloper: {
    type: Boolean,
    default: false
  },
  gamesCreated: {
    type: [String],
    default: []
  },
  createdDate: Date
},{
  collection: 'Users'
})

const User = mongoose.model('Users', UserSchema)

module.exports = User
