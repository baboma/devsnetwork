const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = validateEducationInput = data => {
  let errors = {}
  data.school = !isEmpty(data.school) ? data.school : ''
  data.degree = !isEmpty(data.degree) ? data.degree : ''
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : ''
  data.from = !isEmpty(data.from) ? data.from : ''

  // Check for empty School
  if (validator.isEmpty(data.school)) {
    errors.school = 'School title is required.'
  }

  // Check for empty Degree
  if (validator.isEmpty(data.degree)) {
    errors.degree = 'Degree title is required.'
  }

  // Check for empty Field of Study
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is required.'
  }

  // Check for empty From Date
  if (validator.isEmpty(data.from)) {
    errors.from = 'From Date is required.'
  }

  return { errors, isValid: isEmpty(errors) }
}