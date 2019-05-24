import axios, { AxiosPromise } from 'axios'
import jwtDecode from 'jwt-decode'
import { AuthenticationToken } from '../models/AuthorizationToken'

export const BASE_URL = ''

const fetch = axios.create({
  baseURL: BASE_URL
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleResponse(onFulfilled?: (value: any) => any, onRejected?: (error: any) => any): number {
  return fetch.interceptors.response.use(onFulfilled, onRejected)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get<T = any>(url: string): AxiosPromise<T> {
  return fetch.get<T>(url)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function post<T = any>(url: string, data?: any, config?: any): AxiosPromise<T> {
  return fetch.post<T>(url, data, config)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function put<T = any>(url: string, data?: any, config?: any): AxiosPromise<T> {
  return fetch.put<T>(url, data, config)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function patch<T = any>(url: string, data?: any, config?: any): AxiosPromise<T> {
  return fetch.patch<T>(url, data, config)
}

export function del(url: string): AxiosPromise {
  return fetch.delete(url)
}

export function setAuthorizationToken(token: string): void {
  if (token) {
    fetch.defaults.headers.common.Authorization = token
    window.localStorage.setItem('jwtToken', token)
  }
  else {
    delete fetch.defaults.headers.common.Authorization
    window.localStorage.removeItem('jwtToken')
  }
}

export function getAuthorizationToken(): string {
  return fetch.defaults.headers.common.Authorization
}

export function getAuthorizationTokenContent(): AuthenticationToken | undefined {
  if (fetch.defaults.headers.common.Authorization) {
    return jwtDecode(fetch.defaults.headers.common.Authorization)
  }
  return undefined
}

export function validateToken(): boolean {
  const authorizationToken = getAuthorizationTokenContent()
  // If the authorization exists and is expired (no expiration or expiration time is before
  // the current time), resets the token to prevent it from being used any longer
  // We must divide the current time because the token expiration time unit is seconds and
  // Date.now() returns a time in milliseconds
  if (authorizationToken && !(authorizationToken.exp && authorizationToken.exp > (Date.now() / 1000))) {
    window.location.reload()
    setAuthorizationToken('')
  }
  return getAuthorizationToken() !== undefined
}

setAuthorizationToken(window.localStorage.jwtToken)