// Include packages and define related variables
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')

// 將網址結構符合 '/' 的字串的 request 導向 home 模組
router.use('/', home)

// 將網址結構符合 '/todos' 的字串的 request 導向 todos 模組
router.use('/todos', todos)

// 將網址結構符合 '/users' 的字串的 request 導向 users 模組
router.use('/users', users)

// 匯出路由器
module.exports = router