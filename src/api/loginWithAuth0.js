const express = require('express')
const passport = require('passport')
const querystring = require('querystring')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

router.get('/', (req, res) => {
  console.log('HOST: ', req.headers.origin)
  res.status(200).json({ message: 'Everything is ok!' })
})

router.get(
  '/login',
  async (req, res) => {
    const { returnTo } = req.query
    console.log('Login Session', req.session)
    req.returnTo = returnTo
    const authenticator = passport.authenticate('auth0', {
      scope: 'openid email profile',
      failureMessage: 'Cannot login, try again',
      failureRedirect: `${returnTo}login/error`,
      successRedirect: `${returnTo}login/success`,
      successReturnToOrRedirect: `${returnTo}login/success`,
      initialScreen: 'login',
    })
    authenticator(req, res)
  }
)

router.get(
  '/signup',
  async (req, res) => {
    try {
      const authenticator = passport.authenticate('auth0', {
        scope: 'openid email profile',
        failureMessage: 'Cannot login, try again',
        failureRedirect: 'http://localhost:3000/login/error',
        successRedirect: 'http://localhost:3000/login/success',
        successReturnToOrRedirect: 'http://localhost:3000/login/success',
        initialScreen: 'signUp'
      })
      authenticator(req, res)
    } catch (error) {
      console.log('error Callback', error)
    }
  }
)


router.get(
  '/callback',
  async (req, res) => {
    console.log('session', req.session)

    const returnTo = req.headers.referer ? req.headers.referer : 'http://localhost:3000/'
    const authenticator = passport.authenticate('auth0', {
      scope: 'openid email profile',
      failureMessage: 'Cannot login, try again',
      failureRedirect: `${returnTo}login/error`,
      successRedirect: `${returnTo}login/success`,
      successReturnToOrRedirect: `${returnTo}login/success`,
    })
    authenticator(req, res)
  },
  async (req, res) => {
    try {
      res.status(204).json({ message: 'Login succesfully', user: req.user })
    } catch (error) {
      console.log('error Callback', error)
    }
  }
)

router.get('/logout', (req, res) => {
  req.logOut(() => {
    const { returnTo } = req.query

    const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`)
    const searchString = querystring.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      returnTo
    })
    logoutURL.search = searchString

    res.redirect(logoutURL)
  })
})

router.get('/isAuthAndGetUser', isAuthenticated, (req, res) => {
  // console.log('req user from testLogin', req.user)
  res.status(200).json({ message: "you are authenticate", user: req.user })
})

router.post('/isAuth', isAuthenticated, (req, res) => {
  // console.log('req user from testLogin', req.user)
  res.status(200).json({ message: "you are authenticate" })
})

// From web app example
// router.get('/callback', (req, res, next) => {
//   console.log('Callback')
//   passport.authenticate('auth0', (err, user, info) => {
//     if (err) {
//       console.log('exist an error')
//       return next(err)
//     }
//     if (!user) {
//       return res.redirect('/login')
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err)
//       }
//       const returnTo = req.session.returnTo
//       delete req.session.returnTo
//       res.redirect(returnTo || '/')
//     })
//   })
// })

module.exports = router
    /* config.internalOptions.failureRedirect = config.extraParams.returnToTest + '/login/error'; */
/* config.internalOptions.successRedirect = config.extraParams.returnToTest + '/login/success'; */
/* config.internalOptions.successReturnToOrRedirect = config.extraParams.returnToTest + '/login/success'; */
/* console.log('after modify', config) */
