import * as React from 'react'
import { Link } from 'react-router-dom'
import { IsEmpty } from '../../validation/IsEmpty'

interface PROFILEITEM {
  profile: {
    user: {
      avatar: string
      name: string
    }
    company: string
    location: string
    handle: string
    skills: string[]
    status: string
  }
}

export const ProfileItem: React.FC<PROFILEITEM> = (props: PROFILEITEM): React.ReactElement => {
  const { profile } = props

  return (<div className='card card-body bg-light mb-3'>
    <div className='row'>
      <div className='col-2'>
        <img src={profile.user.avatar} alt='' className='rounded-circle' />
      </div>
      <div className='col-lg-6 col-md-4 col-8'>
        <h3>{profile.user.name}</h3>
        <p>
          {profile.status}{' '}
          {IsEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
        </p>
        <p>
          {IsEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
        </p>
        <Link to={`/profile/${profile.handle}`} className='btn btn-info'>
          View Profile
        </Link>
      </div>
      <div className='col-md-4 d-none d-md-block'>
        <h4>Skill Set</h4>
        <ul className='list-group'>
          {profile.skills.slice(0, 4).map((skill: string, index: number) => (
            <li key={index} className='list-group-item'>
              <i className='fa fa-check pr-1' />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>)
}