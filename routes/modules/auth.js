// Include packages and define related variables
const express = require('express')
const router = express.Router()

const passport = require('passport')

// Set routes
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 匯出 auth 路由模組
module.exports = router