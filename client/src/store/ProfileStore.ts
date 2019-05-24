import { action, observable } from 'mobx'
import { addEducation, addExperience, currentProfile, deleteExperience, getProfileByHandle } from '../actions/profileAction'
import { createProfile, deleteAccount, deleteEducation, getProfiles } from '../actions/profileAction'
import History from 'history'
import { ADDEDUCATION } from '../components/dashboard/add-credentials/AddEducation'
import { ADDEXPERIENCE } from '../components/dashboard/add-credentials/AddExperience'
import { PROFILE } from '../models/Profile'
import { RESPONSE } from '../models/DeleteAccount'
import { PROFILEDATA } from '../models/ProfileData'

interface NOPROFILE {
  noprofile: string
}

interface ERRORSEDU {
  school: string
  degree: string
  fieldofstudy: string
  from: string
}

interface ERRORSEXP {
  title: string
  company: string
  from: string
}

export interface ERRORSPRO {
  handle: string
  status: string
  skills: string
  website: string
  facebook: string
  twitter: string
  linkedin: string
  youtube: string
  instagram: string
}

export default class ProfileStore {
  // error, the has no profile yet
  @observable public error: NOPROFILE = { noprofile: '' }
  // errors when adding education credentials
  @observable public errorsEdu: ERRORSEDU = { school: '', degree: '', fieldofstudy: '', from: '' }
  // errors when adding education credentials
  @observable public errorsExp: ERRORSEXP = { title: '', company: '', from: '' }
  // errors when creating a user profile
  @observable public errorsProfile: ERRORSPRO = { handle: '', status: '', skills: '', website: '', facebook: '', twitter: '', linkedin: '', instagram: '', youtube: '' }
  // Loading
  @observable public loading: boolean = false
  // If the profile is empty
  @observable public isEmpty: boolean = true
  // all the profiles
  @observable public profiles: PROFILE[] = [{
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
  }]
  // The current user profile
  @observable public profile: PROFILE = {
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

  @action
  public getCurrentProfile(): void {
    currentProfile()
      .then(response => {
        this.profile = response.data
        this.isEmpty = false
        this.loading = true
      })
      .catch(error => {
        this.isEmpty = true
        console.log(error.response.data)
      })
  }

  @action
  public deleteEducation(id: string): void {
    deleteEducation(id)
      .then(response => this.profile = response.data)
      .catch(error => console.error(error))
  }

  @action
  public deleteExperience(id: string): void {
    deleteExperience(id)
      .then(response => this.profile = response.data)
      .catch(error => console.error(error))
  }

  @action
  public addEducation(addData: ADDEDUCATION, history: History.History): void {
    addEducation(addData)
      .then(response => history.push('/dashboard'))
      .catch(error => this.errorsEdu = error.response.data)
  }

  @action
  public addExperience(addData: ADDEXPERIENCE, history: History.History): void {
    addExperience(addData)
      .then(response => history.push('/dashboard'))
      .catch(error => this.errorsExp = error.response.data)
  }

  @action
  public deleteAccount(): void {
    if (window.confirm('Are you sure?\nThis is an irreversible action.')) {
      deleteAccount()
        .then(response => {
          const deleted: RESPONSE = response.data
          if (deleted.success) {
            this.isEmpty = true
          }
        })
    }
  }

  @action
  public createProfile(profileData: PROFILEDATA, history: History.History): void {
    createProfile(profileData)
      .then(response => history.push('/dashboard'))
      .catch(error => this.errorsProfile = error.response.data)
  }

  @action
  public getProfiles(): void {
    getProfiles()
      .then(response => {
        this.profiles = response.data
        this.isEmpty = false
      })
      .catch(error => {
        this.error = error.response.data
        this.isEmpty = true
      })
  }

  @action
  public getProfileByHandle(handle: string): void {
    getProfileByHandle(handle)
      .then(response => this.profile = response.data)
      .catch(error => this.profile)
  }
}

export const profileStore: ProfileStore = new ProfileStore()