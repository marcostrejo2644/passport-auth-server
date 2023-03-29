const express = require('express')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

router.get('/auth/user', isAuthenticated, (req, res) => {
  // console.log('User from auth/user: ', req.user)
  res.json(req.user)
})

module.exports = router
