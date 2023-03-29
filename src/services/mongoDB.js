const mongoose = require('mongoose')

const configs = {
  mongoUser: 'franco_admin',
  mongoPassword: 'DZtvUYE5Efce378x',
}
const mongoURL = `mongodb+srv://${configs.mongoUser}:${configs.mongoPassword}@steam-clone.rkjorbf.mongodb.net/steam-db?retryWrites=true&w=majority`

mongoose.set('strictQuery', true)

async function mongoConnect() {
  try {
    await mongoose.connect(mongoURL)
    console.log('DatabaseConnected')
  } catch (error) {
    console.log('Error Connect to mongo: ', error)
  }
}

module.exports = mongoConnect
