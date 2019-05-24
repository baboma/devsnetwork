const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = validateRegisterInput = data => {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  // Validation User Name
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters.'
  }

  // Check for empty User Name
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required.'
  }

  // Validation Email
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email field is invalid.'
  }

  // Check for empty User Name
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required.'
  }

  // Validation Password
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters.'
  }

  // Check for empty Password
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.'
  }

  // Check for empty Password2
  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required.'
  }

  // Validation 2 Passwords
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords do not match.'
  }

  return { errors, isValid: isEmpty(errors) }
}