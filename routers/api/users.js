const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')

// Load Login Validation
const validateLoginInput = require('../../validation/login')

// Load JWT key
const keys = require('../../config/keys')

// Load User model
const User = require('../../models/User')

// @Route   GET api/users/test
// @Desc    Tests users route
// @Access  Public route
router.get('/test', (req, res) => res.json({
  msg: 'Users works'
}))

// @Route   POST api/users/register
// @Desc    Register a user
// @Access  Public route
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const user = await User.findOne({ email: req.body.email })
  if (user) {
    errors.email = 'Email already exists.'
    return res.status(400).json(errors)
  } else {
    const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err
        newUser.password = hash
        try {
          /* const user =  */
          await newUser.save()
          res.json({ success: true })
        } catch (err) {
          console.error(err)
        }
      })
    })
  }
})

// @Route   POST api/users/login
// @Desc    Login a user / Return JWT Token
// @Access  Public route
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find user by email
  const user = await User.findOne({ email }) // { email: email }
  if (!user) {
    errors.email = 'User not found.'
    return res.status(404).json(errors)
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password)
  if (isMatch) { // User match
    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar
    }

    // Sign Token
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err
      res.json({
        success: true,
        token: 'Bearer ' + token
      })
    })
  } else {
    errors.password = 'Password incorrect.'
    return res.status(400).json(errors)
  }
})

// @Route  GET api/users/current
// @Desc   Return the current user
// @Access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar
  })
})

module.exports = router