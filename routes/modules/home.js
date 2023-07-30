// Include packages and define related variables
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// Set routes
// 首頁
router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then(todos => res.render('index', { todos: todos }))
    .catch(error => console.log(error))
})

// 匯出 home 路由模組
module.exports = router