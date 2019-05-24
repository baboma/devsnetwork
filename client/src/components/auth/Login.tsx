import * as React from 'react'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import { LoginContext } from '../../context/GlobalContext'
import LoginStore from '../../store/LoginStore'
import { TextField } from '../common/TextField'
import { RouteComponentProps } from 'react-router-dom'

export interface LOGIN {
  email: string
  password: string
}

export const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps): React.ReactElement => {
  const loginStore: LoginStore = useAsObservableSource(React.useContext(LoginContext))
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const newLogin: LOGIN = {
      email: email,
      password: password
    }
    if (await loginStore.loginUser(newLogin, props.history)) {
      window.location.reload()
    }
  }

  return (<Observer>
    {(): React.ReactElement => (
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 m-auto'>
              <h1 className='display-4 text-center'>Log In</h1>
              <p className='lead text-center'>Sign in to your Developers Network account</p>
              <form onSubmit={onSubmit}>
                <TextField
                  placeholder='Email Address'
                  name='email'
                  type='email'
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  error={loginStore.errors.email}
                />

                <TextField
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  error={loginStore.errors.password}
                />
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    )}
  </Observer>)
}