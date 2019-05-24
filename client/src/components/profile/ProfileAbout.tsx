import * as React from 'react'
import { IsEmpty } from '../../validation/IsEmpty'

interface PROFILEABOUT {
  profile: {
    user: {
      name: string
    }
    skills: string[]
    bio: string
  }
}

export const ProfileAbout: React.FC<PROFILEABOUT> = (props: PROFILEABOUT): React.ReactElement => {
  const { profile } = props
  // Get first name
  const firstName = profile.user.name.trim().split(' ')[0]

  // Skill List
  const skills = profile.skills.map((skill: string, index: number) => (
    <div key={index} className='p-3'><i className='fas fa-check' />{skill}</div>
  ))

  return (<div className='row'>
    <div className='col-md-12'>
      <div className='card card-body bg-light mb-3'>
        <h3 className='text-center text-info'>{firstName}&apos;s Bio</h3>
        <p className='lead'>
          {IsEmpty(profile.bio) ? (<span>{firstName} does not have a bio</span>) :
            (<span>{profile.bio}</span>)}
        </p>
        <hr />
        <h3 className='text-center text-info'>Skill Set</h3>
        <div className='row'>
          <div className='d-flex flex-wrap justify-content-center align-items-center'>
            {skills}
          </div>
        </div>
      </div>
    </div>
  </div>)
}