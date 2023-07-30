// Include packages and define related variables
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// Set routes
// 瀏覽單筆todo的詳細資訊
router.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id
  return Todo.findOne({ where: { id, UserId }})
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

// 匯出 todos 路由模組
module.exports = router