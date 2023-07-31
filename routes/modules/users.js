// Include packages and define related variables
const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const passport = require('passport')

const db = require('../../models')
const User = db.User

// Set routes
// 登入表單頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 送出登入表單
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 註冊表單頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 送出註冊表單
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填！'})
  }
  if(password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！'})
  }
  if (errors.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errors
    })
  }

  User.findOne({ where: { email } }) // 確認該 email 是否註冊過
    .then(user => {
      // 若 user 已存在，返回註冊頁並提示訊息
      if (user) {
        errors.push({ message: '該 Email 已註冊過。' })
        return res.render('register', { name, email, password, confirmPassword, errors })
      }
      // 若不存在，建立新的 user
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出。')
  res.redirect('/users/login')
})

// 匯出 users 路由模組
module.exports = router