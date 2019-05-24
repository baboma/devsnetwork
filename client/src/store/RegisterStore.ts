import { observable } from 'mobx'
import { REGISTER } from '../components/auth/Register'
import { register } from '../actions/authAction'
import History from 'history'

export default class RegisterStore {
  // errors from server when registering a user
  @observable public errors: REGISTER = { name: '', email: '', password: '', password2: '' }

  public async registerUser(userData: REGISTER, history: History.History): Promise<void> {
    await register(userData)
      .then(response => {
        if (response.data.success) {
          history.push('/login')
        }
      })
      .catch(errors => {
        this.errors = errors.response.data
      })
  }
}

export const registerStore: RegisterStore = new RegisterStore()

/*
public registerUser(userData: REGISTER, history: History.History): void {
    register(userData)
      .then(res => console.log(res))
      .catch(err => {
        debugger
        console.log(err.response.data)
        debugger
      })
  }
*/