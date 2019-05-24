export interface PROFILE {
  _id: string
  bio: string
  company: string
  date: string
  githubusername: string
  handle: string
  location: string
  status: string
  website: string
  user: {
    avatar: string
    name: string
  }
  social: {
    youtube: string
    twitter: string
    facebook: string
    linkedin: string
    instagram: string
  }
  education: [{
    _id: string
    school: string
    degree: string
    fieldofstudy: string
    from: string
    to: string
    current: boolean
    description: string
  }]
  experience: [{
    _id: string
    title: string
    company: string
    location: string
    from: string
    to: string
    current: boolean
    description: string
  }]
  skills: string[]
}

export const PROFILEVALUE = {
  _id: '',
  bio: '',
  company: '',
  date: '',
  githubusername: '',
  handle: '',
  location: '',
  status: '',
  website: '',
  user: {
    avatar: '',
    name: ''
  },
  social: {
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: ''
  },
  education: [{
    _id: '',
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  }],
  experience: [{
    _id: '',
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  }],
  skills: []
}