const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

// Routers
const posts = require('./routers/api/posts')
const profile = require('./routers/api/profile')
const users = require('./routers/api/users')

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const app = express()

// DataBase Config
const uri = require('./config/keys').mongoURI

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false)
// Connect to MongoDB DataBase
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err))

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Passport middleware
app.use(passport.initialize())

// Passport config
require('./config/passport')(passport)

// Use routes
app.use('/api/posts', posts)
app.use('/api/profile', profile)
app.use('/api/users', users)


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server\'s running on http//:localhost:${port}`))