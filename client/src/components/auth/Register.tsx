import * as React from 'react'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import { RegisterContext } from '../../context/GlobalContext'
import { TextField } from '../common/TextField'
import { RouteComponentProps } from 'react-router-dom'
import RegisterStore from '../../store/RegisterStore'

export interface REGISTER {
  name: string
  email: string
  password: string
  password2: string
}

export const Register: React.FC<RouteComponentProps> = (props: RouteComponentProps): React.ReactElement => {
  const registerStore: RegisterStore = useAsObservableSource(React.useContext(RegisterContext))
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const newRegister: REGISTER = {
      name: name,
      email: email,
      password: password,
      password2: password2
    }
    await registerStore.registerUser(newRegister, props.history)
  }

  return (<Observer>
    {(): React.ReactElement => (
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 m-auto'>
              <h1 className='display-4 text-center'>Sign Up</h1>
              <p className='lead text-center'>Create your Developers Network account</p>
              <form noValidate onSubmit={onSubmit}>
                <TextField
                  placeholder='Name'
                  name='name'
                  type='text'
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  error={registerStore.errors.name}
                />

                <TextField
                  placeholder='Email Address'
                  name='email'
                  type='email'
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  error={registerStore.errors.email}
                  info='This site uses Gravatar so if you want a profile image, use a Gravatar email'
                />

                <TextField
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  error={registerStore.errors.password}
                />

                <TextField
                  placeholder='Confirm Password'
                  name='password2'
                  type='password'
                  value={password2}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
                  error={registerStore.errors.password2}
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