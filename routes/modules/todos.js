// Include packages and define related variables
const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// Set routes
// 新增 todo 表單頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 送出新增 todo 表單
router.post('/', (req, res) => {
  const errors = []
  const { name } = req.body
  const UserId = req.user.id
  // 檢查欄位是否為空
  if (!name) {
    errors.push({ message: '請輸入欲新增的待辦事項！' })
    return res.render('new', { errors })
  }
  // 確認使用者輸入內容後，新增至資料庫
  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

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