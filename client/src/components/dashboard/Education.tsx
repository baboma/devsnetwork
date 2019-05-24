import * as React from 'react'
import { useAsObservableSource } from 'mobx-react-lite'
import Moment from 'react-moment'
import ProfileStore from '../../store/ProfileStore'
import { ProfileContext } from '../../context/GlobalContext'

export interface EDUCATION {
  _id: string
  school: string
  degree: string
  fieldofstudy: string
  from: string
  to: string
  current: boolean
  description: string
}

interface MYEDUCATION {
  education: EDUCATION[]
}

export const Education: React.FC<MYEDUCATION> = (props: MYEDUCATION): React.ReactElement => {
  const profileStore: ProfileStore = useAsObservableSource(React.useContext(ProfileContext))

  const onDeleteClick = (id: string): void => {
    profileStore.deleteEducation(id)
  }

  const education = props.education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -
        {edu.to === null ? (' Now') : (<span>{' '}<Moment format='YYYY/MM/DD'>{edu.to}</Moment></span>)}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={(e: React.MouseEvent) => onDeleteClick.bind(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <div>
      <h4 className='mb-4'>Education Credentials</h4>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
          {education}
        </thead>
      </table>
    </div>
  )
}