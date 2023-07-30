// Include packages and define related variables
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const db = require('./models')
const Todo = db.Todo
const User = db.User

const app = express()

const PORT = 3000

// Set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// Ser method-override
app.use(methodOverride('_method'))

// Set routes
// 首頁
app.get('/', (req, res) => {
  res.send('Good!')
})

// 登入表單頁面
app.get('/users/login', (req, res) => {
  res.render('login')
})

// 送出登入表單
app.post('/users/login', (req, res) => {
  res.send('login')
})

// 註冊表單頁面
app.get('/users/register', (req, res) => {
  res.render('register')
})

// 送出註冊表單
app.post('/users/register', (req, res) => {
  const { name, email, password } = req.body
  User.create({ name, email, password })
    .then(() => res.redirect('/'))
})

// 登出
app.get('/users/logout', (req, res) => {
  res.send('logout')
})

// Start and listen the server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})