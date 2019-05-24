import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { TextField } from '../../common/TextField'
import { TextAreaField } from '../../common/TextAreaField'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import { ProfileContext } from '../../../context/GlobalContext'
import ProfileStore from '../../../store/ProfileStore'

export interface ADDEXPERIENCE {
  company: string
  title: string
  location: string
  from: string
  to: string
  current: boolean
  description: string
}


type Props = RouteComponentProps
const AddExperience: React.FC<RouteComponentProps> = (props: Props): React.ReactElement => {
  const profileStore: ProfileStore = useAsObservableSource(React.useContext(ProfileContext))
  const initialState: ADDEXPERIENCE = {
    company: '', title: '', location: '', from: '', to: '', current: false, description: ''
  }
  const [addexperience, setAddExperience] = React.useState<ADDEXPERIENCE>(initialState)
  const [disabled, setDisabled] = React.useState(false)

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const expData = {
      company: addexperience.company,
      title: addexperience.title,
      location: addexperience.location,
      from: addexperience.from,
      to: addexperience.to,
      current: addexperience.current,
      description: addexperience.description
    }
    profileStore.addExperience(expData, props.history)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setAddExperience({ ...addexperience, [e.target.name]: e.target.value })
  }

  const onCheck = (e: React.ChangeEvent): void => {
    setAddExperience({ ...addexperience, current: !addexperience.current })
    setDisabled(!disabled)
  }

  return (<Observer>
    {(): React.ReactElement => (
      <div className='add-experience'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/dashboard' className='btn btn-light'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Add Experience</h1>
              <p className='lead text-center'>
                Add any job or position that you have had in the past or current
              </p>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={onSubmit}>
                <TextField
                  placeholder='* Company'
                  name='company'
                  value={addexperience.company}
                  onChange={onChange}
                  error={profileStore.errorsExp.company}
                />
                <TextField
                  placeholder='* Job Title'
                  name='title'
                  value={addexperience.title}
                  onChange={onChange}
                  error={profileStore.errorsExp.title}
                />
                <TextField
                  placeholder='Location'
                  name='location'
                  value={addexperience.location}
                  onChange={onChange}
                  /* error={errors.location} */
                  info='City or city & state suggested (eg. Boston, MA).'
                />
                <h6>From Date</h6>
                <TextField
                  name='from'
                  type='date'
                  value={addexperience.from}
                  onChange={onChange}
                  error={profileStore.errorsExp.from}
                />
                <h6>To Date</h6>
                <TextField
                  name='to'
                  type='date'
                  value={addexperience.to}
                  onChange={onChange}
                  /* error={errors.to} */
                  disabled={disabled}
                />
                <div className='form-check mb-4'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    name='current'
                    checked={addexperience.current}
                    onChange={onCheck}
                    id='current'
                  />
                  <label htmlFor='current' className='form-check-label.'>
                    Current Job
                  </label>
                </div>
                <TextAreaField
                  placeholder='Job Description'
                  name='description'
                  value={addexperience.description}
                  onChange={onChange}
                  /* error={errors.description} */
                  info='Tell us about the the position.'
                />
                <input
                  type='submit'
                  value='Submit'
                  className='btn btn-info btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )}
  </Observer>)
}

export default AddExperience