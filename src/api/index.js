const express = require('express')
const userRoute = require('./user')
const loginWithAuth0 = require('./loginWithAuth0')

const router = express.Router()

router.use(userRoute)
router.use(loginWithAuth0)

module.exports = router

