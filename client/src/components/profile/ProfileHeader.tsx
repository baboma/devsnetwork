import * as React from 'react'
import { IsEmpty } from '../../validation/IsEmpty'
import { Observer, useAsObservableSource } from 'mobx-react-lite'

interface PROFILE {
  user: {
    avatar: string
    name: string
  }
  company: string
  location: string
  website: string
  status: string
  social: {
    facebook: string
    twitter: string
    linkedin: string
    instagram: string
    youtube: string
  }
}

interface PROFILEHEADER {
  profile: PROFILE
}

export const ProfileHeader: React.FC<PROFILEHEADER> = (props: PROFILEHEADER): React.ReactElement => {
  const profile = useAsObservableSource(props.profile)
  /* const { profile } = props */
  return (<Observer>
    {() => (
      <div className='row'>
        <div className='col-md-12'>
          <div className='card card-body bg-info text-white mb-3'>
            <div className='row'>
              <div className='col-4 col-md-3 m-auto'>
                <img
                  className='rounded-circle'
                  src={profile.user.avatar}
                  alt={profile.user.name}
                />
              </div>
            </div>
            <div className='text-center'>
              <h1 className='display-4 text-center'>{profile.user.name}</h1>
              <p className='lead text-center'>
                {profile.status}{' '}
                {IsEmpty(profile.company) ? <></> : (<span>at {profile.company}</span>)}
              </p>
              {IsEmpty(profile.location) ? <></> : <p>{profile.location}</p>}
              <p>
                {IsEmpty(profile.website) ? <></> : (
                  <a className='text-white p-2' href={profile.website} target='_blank' rel='noopener noreferrer'>
                    <i className='fas fa-globe fa-2x' />
                  </a>
                )}

                {IsEmpty(profile.social && profile.social.twitter) ? <></> : (
                  <a className='text-white p-2' href={profile.social.twitter} target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-twitter fa-2x' />
                  </a>
                )}

                {IsEmpty(profile.social && profile.social.facebook) ? <></> : (
                  <a className='text-white p-2' href={profile.social.facebook} target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-facebook fa-2x' />
                  </a>
                )}

                {IsEmpty(profile.social && profile.social.linkedin) ? <></> : (
                  <a className='text-white p-2' href={profile.social.linkedin} target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-linkedin fa-2x' />
                  </a>
                )}

                {IsEmpty(profile.social && profile.social.youtube) ? <></> : (
                  <a className='text-white p-2' href={profile.social.youtube} target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-youtube fa-2x' />
                  </a>
                )}

                {IsEmpty(profile.social && profile.social.instagram) ? <></> : (
                  <a className='text-white p-2' href={profile.social.instagram} target='_blank'
                    rel='noopener noreferrer'>
                    <i className='fab fa-instagram fa-2x' />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </Observer>)
}