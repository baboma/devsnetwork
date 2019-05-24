const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = validateExperienceInput = data => {
  let errors = {}
  data.title = !isEmpty(data.title) ? data.title : ''
  data.company = !isEmpty(data.company) ? data.company : ''
  data.from = !isEmpty(data.from) ? data.from : ''

  // Check for empty Title
  if (validator.isEmpty(data.title)) {
    errors.title = 'Job title is required.'
  }

  // Check for empty User Name
  if (validator.isEmpty(data.company)) {
    errors.company = 'Company name is required.'
  }

  // Check for empty From Date
  if (validator.isEmpty(data.from)) {
    errors.from = 'From Date is required.'
  }

  return { errors, isValid: isEmpty(errors) }
}