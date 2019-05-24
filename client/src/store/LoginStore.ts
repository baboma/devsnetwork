import { action, observable } from 'mobx'
import { LOGIN } from '../components/auth/Login'
import { USER, currentUser, login } from '../actions/authAction'
import * as transport from '../api/transport'
import History from 'history'

export default class LoginStore {
  // errors from server when registering a user
  @observable public errors: LOGIN = { email: '', password: '' }
  // the current user get after authentication
  @observable public user: USER = { id: '', name: '', email: '', avatar: '' }

  @action
  public async loginUser(userData: LOGIN, history: History.History): Promise<boolean> {
    await login(userData)
      .then(response => {
        const { token } = response.data
        transport.setAuthorizationToken(token)
        history.push('/dashboard')
      })
      .catch(errors => {
        this.errors = errors.response.data
      })
    return transport.validateToken()
  }

  @action
  public getCurrentUser(): void {
    currentUser()
      .then(response => this.user = response.data)
  }

}

export const loginStore: LoginStore = new LoginStore()