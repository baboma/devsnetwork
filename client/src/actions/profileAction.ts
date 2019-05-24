/* eslint-disable @typescript-eslint/no-explicit-any */
import * as transport from '../api/transport'
import { AxiosPromise } from 'axios'
import { ADDEDUCATION } from '../components/dashboard/add-credentials/AddEducation'
import { ADDEXPERIENCE } from '../components/dashboard/add-credentials/AddExperience'
import { PROFILE } from '../models/Profile'
import { RESPONSE } from '../models/DeleteAccount'
import { PROFILEDATA } from '../models/ProfileData'

// Get current profile
export const currentProfile = (): AxiosPromise<PROFILE> => {
  return transport.get<PROFILE>('/api/profile')
}

// Delete Education
export const deleteEducation = (id: string): AxiosPromise<PROFILE> => {
  return transport.del(`/api/profile/education/${id}`)
}

// Delete Experience
export const deleteExperience = (id: string): AxiosPromise<PROFILE> => {
  return transport.del(`/api/profile/experience/${id}`)
}

// Add Education
export const addEducation = (eduData: ADDEDUCATION): AxiosPromise<PROFILE> => {
  return transport.post<PROFILE>('/api/profile/education', eduData)
}

// Add Experience
export const addExperience = (expData: ADDEXPERIENCE): AxiosPromise<PROFILE> => {
  return transport.post<PROFILE>('/api/profile/experience', expData)
}

// Delete account and profile
export const deleteAccount = (): AxiosPromise<RESPONSE> => {
  return transport.del('/api/profile')
}

// Create profile
export const createProfile = (profileData: PROFILEDATA): AxiosPromise<PROFILE> => {
  return transport.post('api/profile', profileData)
}

// Get all profiles
export const getProfiles = (): AxiosPromise<PROFILE[]> => {
  return transport.get<PROFILE[]>('api/profile/all')
}

// Get Profile by Handle
export const getProfileByHandle = (handle: string): AxiosPromise<PROFILE> => {
  return transport.get<PROFILE>(`/api/profile/handle/${handle}`)
}