/* eslint-disable @typescript-eslint/no-explicit-any */
import * as transport from '../api/transport'
import { AxiosPromise } from 'axios'
import { REGISTER } from '../components/auth/Register'
import { LOGIN } from '../components/auth/Login'

export interface SUCCESS {
  success: boolean
}

export interface PAYLOAD {
  success: boolean
  token: string
}

export interface USER {
  id: string
  name: string
  email: string
  avatar: string
}

export const register = (userData: REGISTER): AxiosPromise<SUCCESS> => {
  return transport.post<SUCCESS>('/api/users/register', userData)
}

export const login = (userData: LOGIN): AxiosPromise<PAYLOAD> => {
  return transport.post<PAYLOAD>('/api/users/login', userData)
}

export const currentUser = (): AxiosPromise<USER> => {
  return transport.get<USER>('/api/users/current')
}