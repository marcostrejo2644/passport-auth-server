const express = require('express')
const passport = require('passport')
const cors = require('cors')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')

const routes = require('./api/index')
const mongoConnect = require('./services/mongoDB')

require('./auth/passportAuth0')

require('dotenv').config()

mongoConnect()

require('dotenv').config()
const app = express()
const port = process.env.PORT || '8000'

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
}

if (app.get('env') === 'production') {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true
}

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
)

app.use(cookieParser('ultrasecreto'))
app.use(expressSession(session))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())

app.use('/api/v1', routes)

app.listen(port, () => console.log(`Server on http://localhost:${port}`))
