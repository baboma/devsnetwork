import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import { ProfileContext } from '../../context/GlobalContext'
import ProfileStore from '../../store/ProfileStore'
import { ProfileAbout } from './ProfileAbout'
import { ProfileCreds } from './ProfileCreds'
import { ProfileGithub } from './ProfileGithub'
import { ProfileHeader } from './ProfileHeader'

type Props = RouteComponentProps<{ handle: string }>
const Profile: React.FC<Props> = (props: Props): React.ReactElement => {
  const profileStore: ProfileStore = useAsObservableSource(React.useContext(ProfileContext))
  profileStore.getCurrentProfile()
  profileStore.getProfileByHandle(props.match.params.handle)

  const ProfileContent: React.ReactElement = (<Observer>
    {() => (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <Link to='/profiles' className='btn btn-light mb-3 float-left'>
              Back To Profiles
            </Link>
          </div>
          <div className='col-md-6' />
        </div>
        <ProfileHeader profile={profileStore.profile} />
        <ProfileAbout profile={profileStore.profile} />
        <ProfileCreds
          education={profileStore.profile.education} experience={profileStore.profile.experience}
        />
        {profileStore.profile.githubusername ?
          (<ProfileGithub username={profileStore.profile.githubusername} />) : <></>
        }
      </div>
    )}
  </Observer>)

  return (<Observer>
    {() => (<div className='profile'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            {ProfileContent}
          </div>
        </div>
      </div>
    </div>)}
  </Observer>)
}

export default Profile