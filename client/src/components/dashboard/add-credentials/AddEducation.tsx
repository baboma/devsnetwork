import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { TextField } from '../../common/TextField'
import { TextAreaField } from '../../common/TextAreaField'
import ProfileStore from '../../../store/ProfileStore'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import { ProfileContext } from '../../../context/GlobalContext'

export interface ADDEDUCATION {
  school: string
  degree: string
  fieldofstudy: string
  from: string
  to: string
  current: boolean
  description: string
}

type Props = RouteComponentProps
const AddEducation: React.FC<RouteComponentProps> = (props: Props): React.ReactElement => {
  const profileStore: ProfileStore = useAsObservableSource(React.useContext(ProfileContext))
  const initialstate: ADDEDUCATION = { school: '', degree: '', fieldofstudy: '', from: '', to: '', current: false, description: '' }
  const [addeducation, setAddEducation] = React.useState<ADDEDUCATION>(initialstate)
  const [disabled, setDisabled] = React.useState(false)

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const eduData: ADDEDUCATION = {
      school: addeducation.school,
      degree: addeducation.degree,
      fieldofstudy: addeducation.fieldofstudy,
      from: addeducation.from,
      to: addeducation.to,
      current: addeducation.current,
      description: addeducation.description,
    }
    profileStore.addEducation(eduData, props.history)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setAddEducation({ ...addeducation, [e.target.name]: e.target.value })
  }

  const onCheck = (e: React.ChangeEvent): void => {
    setAddEducation({ ...addeducation, current: !addeducation.current })
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
              <h1 className='display-4 text-center'>Add Education</h1>
              <p className='lead text-center'>
                Add any school, bootcamp, etc that you have attended.
              </p>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={onSubmit}>
                <TextField
                  placeholder='* School, Bootcamp, University'
                  name='school'
                  value={addeducation.school}
                  onChange={onChange}
                  error={profileStore.errorsEdu.school}
                />
                <TextField
                  placeholder='* Degree or Certification'
                  name='degree'
                  value={addeducation.degree}
                  onChange={onChange}
                  error={profileStore.errorsEdu.degree}
                />
                <TextField
                  placeholder='* Field of Study'
                  name='fieldofstudy'
                  value={addeducation.fieldofstudy}
                  onChange={onChange}
                  error={profileStore.errorsEdu.fieldofstudy}
                />
                <h6>From Date</h6>
                <TextField
                  name='from'
                  type='date'
                  value={addeducation.from}
                  onChange={onChange}
                  error={profileStore.errorsEdu.from}
                />
                <h6>To Date</h6>
                <TextField
                  name='to'
                  type='date'
                  value={addeducation.to}
                  onChange={onChange}
                  /* error={errors.to} */
                  disabled={disabled}
                />
                <div className='form-check mb-4'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    name='current'
                    checked={addeducation.current}
                    onChange={onCheck}
                    id='current'
                  />
                  <label htmlFor='current' className='form-check-label.'>
                    Current Program
                  </label>
                </div>
                <TextAreaField
                  placeholder='Program Description'
                  name='description'
                  value={addeducation.description}
                  onChange={onChange}
                  /* error={errors.description} */
                  info='Tell us about the program.'
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

export default AddEducation