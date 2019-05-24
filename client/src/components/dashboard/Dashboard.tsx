import * as React from 'react'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import { ProfileContext } from '../../context/GlobalContext'
import ProfileStore from '../../store/ProfileStore'
import { Link } from 'react-router-dom'
import { Education } from './Education'
import { Experience } from './Experience'
import { ProfileActions } from './ProfileActions'

const Dashboard: React.FC = (): React.ReactElement => {
  const profileStore: ProfileStore = useAsObservableSource(React.useContext(ProfileContext))
  profileStore.getCurrentProfile()

  const onDeleteClick = (): void => {
    profileStore.deleteAccount()
  }

  const noprofile: React.ReactElement = (<Observer>
    {(): React.ReactElement => (
      <div>
        <p className='lead text-muted'>Welcome {profileStore.profile.user.name}</p>
        <p>You have not yet setup a profile, please add some info.</p>
        <Link to='/create-profile' className='btn btn-lg btn-info'>
          Create Profile
        </Link>
      </div>
    )}
  </Observer>)

  const hasprofile: React.ReactElement = (<Observer>
    {(): React.ReactElement => (
      <div>
        <p className='lead text-muted'>Welcome{' '}
          <Link to={`/profile/${profileStore.profile.handle}`}>{profileStore.profile.user.name}</Link>
        </p>
        <ProfileActions />
        <Experience experience={profileStore.profile.experience} />
        <Education education={profileStore.profile.education} />
        <div style={{ marginBottom: '60px' }} />
        <button className='btn btn-danger' onClick={onDeleteClick}>
          Delete My Account
        </button>
      </div>
    )}
  </Observer>)

  return (<Observer>
    {() => (<div className='dashboard'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='display-4'>Dashboard</h1>
            {profileStore.isEmpty ? noprofile : hasprofile}
          </div>
        </div>
      </div>
    </div>)}
  </Observer>)
}

export default Dashboard