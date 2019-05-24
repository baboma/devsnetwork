const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

// Load Profile Model
const Profile = require('../../models/Profile')

// Load User Model
const User = require('../../models/User')

// @Route   GET api/profile/test
// @Desc    Tests profiles route
// @Access  Public route
router.get('/test', (req, res) => res.json({
  msg: "Profile works"
}))

// @Route   GET api/profile/handle/:handle
// @Desc    Get profile by handle
// @Access  Public route
router.get('/handle/:handle', async (req, res) => {
  const errors = {}
  try {
    const profile = await Profile.findOne({ handle: req.params.handle })
      .populate('user', ['name', 'avatar'])
    if (!profile) {
      errors.noprofile = "There is no profile for this user."
      return res.status(404).json(errors)
    }
    res.json(profile)
  } catch (err) {
    res.status(404).json(err)
  }
})

// @Route   GET api/profile/user/:user_id
// @Desc    Get profile by id
// @Access  Public route
router.get('/user/:user_id', async (req, res) => {
  const errors = {}
  try {
    const profile = await Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
    if (!profile) {
      errors.noprofile = "There is no profile for this user."
      return res.status(404).json(errors)
    }
    res.json(profile)
  } catch (err) {
    res.status(404).json({ profile: "There is no profile." })
  }
})

// @Route   GET api/profile/handle/:handle
// @Desc    Get profile by handle
// @Access  Public route
router.get('/all', async (req, res) => {
  const errors = {}
  try {
    const profiles = await Profile.find()
      .populate('user', ['name', 'avatar'])
    if (!profiles) {
      errors.noprofile = "There are no profiles."
      return res.status(404).json(errors)
    }
    res.json(profiles)
  } catch (err) {
    res.status(404).json({ profile: "There are no profile." })
  }
})

// @Route   GET api/profile
// @Desc    Get current users profile
// @Access  Private route
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = {}
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
    if (!profile) {
      errors.noprofile = "You don't have a profile yet."
      return res.status(404).json(errors)
    }
    res.json(profile)
  } catch (err) {
    res.status(404).json(err)
  }
})

// @Route   POST api/profile
// @Desc    Create/ Edit a user profile
// @Access  Private route
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)

  //Check Validation
  if (!isValid) {
    //return any errors with 400 status
    return res.status(400).json(errors)
  }

  //Get fields
  const profileFields = {}

  profileFields.user = req.user.id
  if (req.body.handle) profileFields.handle = req.body.handle
  if (req.body.company) profileFields.company = req.body.company
  if (req.body.website) profileFields.website = req.body.website
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.status) profileFields.status = req.body.status
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername

  //Skills split into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(',')
  }

  //Social
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram

  const profile = await Profile.findOne({ user: req.user.id })
  if (profile) {
    //Update
    const profileUpdated = await Profile.findOneAndUpdate({ user: req.user.id },
      { $set: profileFields }, { new: true })
    res.json(profileUpdated)
  } else {//Create
    //Check if handle exists
    const profileHandle = await Profile.findOne({ handle: profileFields.handle })
    if (profileHandle) {
      errors.handle = "That handle already exists."
    }
    //Save Profile
    const profileSaved = await new Profile(profileFields).save()
    res.json(profileSaved)
  }
})


// @Route   POST api/profile/experience
// @Desc    Add experience to profile
// @Access  Private route
router.post('/experience', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body)

  //Check Validation
  if (!isValid) {
    //return any errors with 400 status
    return res.status(400).json(errors)
  }

  const profile = await Profile.findOne({ user: req.user.id })
  const newExp = {
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description,
  }

  //Add experience to array
  profile.experience.unshift(newExp)

  const profileSaved = await profile.save()
  res.json(profileSaved)
})

// @Route   POST api/profile/education
// @Desc    Add education to profile
// @Access  Private route
router.post('/education', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body)

  //Check Validation
  if (!isValid) {
    //return any errors with 400 status
    return res.status(400).json(errors)
  }

  const profile = await Profile.findOne({ user: req.user.id })
  const newEdu = {
    school: req.body.school,
    degree: req.body.degree,
    fieldofstudy: req.body.fieldofstudy,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description,
  }

  //Add education to array
  profile.education.unshift(newEdu)

  const profileSaved = profile.save()
  res.json(profileSaved)
})

// @Route   DELETE api/profile/experience/:exp_id
// @Desc    Delete experience from profile
// @Access  Private route
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
    // Splice out of array
    profile.experience.splice(removeIndex, 1)
    // Save
    try {
      const profileSaved = await profile.save()
      res.json(profileSaved)
    } catch (err) {
      console.error(err)
    }
  } catch (err) {
    res.status(404).json(err)
  }
})

// @Route   DELETE api/profile/education/:edu_id
// @Desc    Delete education from profile
// @Access  Private route
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id)
    // Splice out of array
    profile.education.splice(removeIndex, 1)
    // Save
    try {
      const profileSaved = await profile.save()
      res.json(profileSaved)
    } catch (err) {
      console.error(err)
    }
  } catch (err) {
    res.status(404).json(err)
  }
})

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id })
    await User.findOneAndDelete({ _id: req.user.id })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router