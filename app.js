// Include packages and define related variables
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

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
app.get('/', (req, res) => {
  res.send('Good!')
})

// Start and listen the server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})