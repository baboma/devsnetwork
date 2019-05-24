import * as React from 'react'
import { useAsObservableSource } from 'mobx-react-lite'
import Moment from 'react-moment'
import ProfileStore from '../../store/ProfileStore'
import { ProfileContext } from '../../context/GlobalContext'

export interface EXPERIENCE {
  _id: string
  title: string
  company: string
  location: string
  from: string
  to: string
  current: boolean
  description: string
}

interface MYEXPERIENCE {
  experience: EXPERIENCE[]
}

export const Experience: React.FC<MYEXPERIENCE> = (props: MYEXPERIENCE): React.ReactElement => {
  const profileStore: ProfileStore = useAsObservableSource(React.useContext(ProfileContext))

  const onDeleteClick = (id: string): void => {
    profileStore.deleteExperience(id)
  }

  const experience = props.experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
        {exp.to === null ? (' Now') : (<span>{' '}<Moment format='YYYY/MM/DD'>{exp.to}</Moment></span>)}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={(e: React.MouseEvent) => onDeleteClick(exp._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (<div>
    <h4 className='mb-4'>Experience Credentials</h4>
    <table className='table'>
      <thead>
        <tr>
          <th>Company</th>
          <th>Title</th>
          <th>Years</th>
          <th />
        </tr>
        {experience}
      </thead>
    </table>
  </div>)
}