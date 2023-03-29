const passport = require('passport')
const Auth0Strategy = require('passport-auth0')

const User = require('../models/user')

require('dotenv').config()

Auth0Strategy.prototype.authorizationParams = function (options) {
  var options = options || {};
  var params = Object.assign({}, options);

  if (this.authParams && typeof this.authParams.nonce === 'string') {
    params.nonce = this.authParams.nonce;
  }

  if (options.initialScreen && typeof options.initialScreen === 'string') {
      params.initial_screen = options.initialScreen;
  }

  if (options.returnToTest && typeof options.returnToTest === 'string') {
      params.returnToTest = options.returnToTest;
  }

  return params;
}

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      profileFields: ['email'],
      state: true,
      passReqToCallback: true
    },
    async function (req, accessToken, refreshToken, extraParams, profile, cb) {
      try {
        console.log('entering to passport Use', req.returnTo)
        cb(null, profile)
      /*   const user = { */
      /*     email: profile.emails[0].value, */
      /*     username: profile.nickname, */
      /*     profilePicture: profile.picture || '', */
      /*     description: '', */
      /*     gamesLibrary: [], */
      /*     gamesCreated: [], */
      /*     isDeveloper: false, */
      /*     customURL: '', */
      /*     thirdParty: profile.user_id, */
      /*     password: profile.password || '', */
      /*     updateDate: new Date(), */
      /*   } */
      /**/
      /*   const userFind = await User.findOne({ */
      /*     email: user.email, */
      /*   }) */
      /*   if (userFind) { */
      /*     // console.log('userFind', userFind) */
      /*     cb(null, userFind) */
      /*   } else { */
      /*     // console.log('saving user', user) */
      /*     const userMongo = new User(user) */
      /*     userMongo.save(user) */
      /*     return cb(null, userMongo) */
      /*   } */
      } catch (error) {
        cb(error, null)
      }
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser(async (user, cb) => {
  try {
    // console.log('user deserializeUser', user)
    const userFromMongo = await User.findOne({ email: user?.email })
    cb(null, userFromMongo)
  } catch (error) {
    cb(error, null)
  }
})
