/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { ProfileItem } from './ProfileItem'
import { ProfileContext } from '../../context/GlobalContext'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import ProfileStore from '../../store/ProfileStore'

const Profiles: React.FC = (): React.ReactElement => {
  const profileStore: ProfileStore = useAsObservableSource(React.useContext(ProfileContext))
  profileStore.getProfiles()

  const profileItems = (<Observer>
    {(): any => (
      profileStore.profiles.map(profile => (<ProfileItem key={profile._id} profile={profile} />))
    )}
  </Observer>)

  return (<Observer>
    {() => (
      <div className='profiles'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4 text-center'>Developer Profiles</h1>
              <p className='lead text-center'>
                Browse and connect with developers
              </p>
              {profileStore.isEmpty ? (<h4>No profiles found...</h4>) : profileItems}
            </div>
          </div>
        </div>
      </div>
    )}
  </Observer>)
}

export default Profiles