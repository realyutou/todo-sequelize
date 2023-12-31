// Include packages and define related variables
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
const usePassport = require('./config/passport')

const app = express()
const PORT = process.env.PORT

// Set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Set express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// Ser method-override
app.use(methodOverride('_method'))

// 呼叫 passport 函式並傳入 app
usePassport(app)

// Set connect-flash
app.use(flash())

// Set res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 將 request 導入路由器
app.use(routes)

// Start and listen the server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})