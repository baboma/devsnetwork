import * as React from 'react'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import { Link, RouteComponentProps } from 'react-router-dom'
import { ProfileContext } from '../../../context/GlobalContext'
import ProfileStore from '../../../store/ProfileStore'
import { InputGroup } from '../../common/InputGroup'
import { TextField } from '../../common/TextField'
import { TextAreaField } from '../../common/TextAreaField'
import { SelectListGroup } from '../../common/SelectListGroup'
import { PROFILEDATA } from '../../../models/ProfileData'

type Props = RouteComponentProps
const EditProfile: React.FC<RouteComponentProps> = (props: Props): React.ReactElement => {
  const profileStore: ProfileStore = useAsObservableSource(React.useContext(ProfileContext))
  const { profile } = profileStore
  // Bring skills array back to CSV
  const skillsCSV = profile.skills.join(', ')

  const [handle, setHandle] = React.useState(profile.handle)
  const [company, setCompany] = React.useState(profile.company)
  const [website, setWebsite] = React.useState(profile.website)
  const [location, setLocation] = React.useState(profile.location)
  const [status, setStatus] = React.useState(profile.status)
  const [githubusername, setGithubusername] = React.useState(profile.githubusername)
  const [bio, setBio] = React.useState(profile.bio)
  const [twitter, setTwitter] = React.useState(profile.social.twitter)
  const [facebook, setFacebook] = React.useState(profile.social.facebook)
  const [linkedin, setLinkedin] = React.useState(profile.social.linkedin)
  const [youtube, setYoutube] = React.useState(profile.social.youtube)
  const [instagram, setInstagram] = React.useState(profile.social.instagram)
  const [skills, setSkills] = React.useState(skillsCSV)
  const [displaySocialInputs, setDisplaySocialInputs] = React.useState(false)

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const profileData: PROFILEDATA = {
      handle: handle,
      company: company,
      website: website,
      location: location,
      status: status,
      skills: skills,
      githubusername: githubusername,
      bio: bio,
      twitter: twitter,
      facebook: facebook,
      linkedin: linkedin,
      youtube: youtube,
      instagram: instagram
    }
    profileStore.createProfile(profileData, props.history)
  }

  let socialInputs: React.ReactElement
  if (displaySocialInputs) {
    socialInputs = (<Observer>
      {() => (
        < div >
          <InputGroup
            placeholder='Twitter Profile URL'
            name='twitter'
            icon='fab fa-twitter'
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            error={profileStore.errorsProfile.twitter}
          />

          <InputGroup
            placeholder='Facebook Page URL'
            name='facebook'
            icon='fab fa-facebook'
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            error={profileStore.errorsProfile.facebook}
          />

          <InputGroup
            placeholder='Linkedin Profile URL'
            name='linkedin'
            icon='fab fa-linkedin'
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            error={profileStore.errorsProfile.linkedin}
          />

          <InputGroup
            placeholder='YouTube Channel URL'
            name='youtube'
            icon='fab fa-youtube'
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            error={profileStore.errorsProfile.youtube}
          />

          <InputGroup
            placeholder='Instagram Page URL'
            name='instagram'
            icon='fab fa-instagram'
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            error={profileStore.errorsProfile.instagram}
          />
        </div>
      )}
    </Observer>)
  }

  // Select options for status
  const options = [
    { label: '* Select Professional Status', value: 0 },
    { label: 'Developer', value: 'Developer' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Senior Developer', value: 'Senior Developer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Student or Learning', value: 'Student or Learning' },
    { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
    { label: 'Intern', value: 'Intern' },
    { label: 'Other', value: 'Other' }
  ]

  return (<Observer>
    {() => (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/dashboard' className='btn btn-light'>Go Back</Link>
              <h1 className='display-4 text-center'>Edit Profile</h1>
              <small className='d-block pb-3'>* = required fields</small>
              <form onSubmit={onSubmit}>
                <TextField
                  placeholder='* Profile Handle'
                  name='handle'
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  error={profileStore.errorsProfile.handle}
                  info='A unique handle for your profile URL. Your full name, company name, nickname.'
                />
                <SelectListGroup
                  placeholder='Status'
                  name='status'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  options={options}
                  error={profileStore.errorsProfile.status}
                  info='Give us an idea of where you are at in your career.'
                />
                <TextField
                  placeholder='Company'
                  name='company'
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  /* error={profileStore.errorsProfile.company} */
                  info='Could be your own company or one you work for.'
                />
                <TextField
                  placeholder='Website'
                  name='website'
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  error={profileStore.errorsProfile.website}
                  info='Could be your own website or a company one.'
                />
                <TextField
                  placeholder='Location'
                  name='location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  /* error={profileStore.errorsProfile.location} */
                  info='City or city & state suggested (eg. Boston, MA).'
                />
                <TextField
                  placeholder='* Skills'
                  name='skills'
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  error={profileStore.errorsProfile.skills}
                  info='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP).'
                />
                <TextField
                  placeholder='Github Username'
                  name='githubusername'
                  value={githubusername}
                  onChange={(e) => setGithubusername(e.target.value)}
                  /* error={profileStore.errorsProfile.githubusername} */
                  info='If you want your latest repos and a Github link, include your username'
                />
                <TextAreaField
                  placeholder='Short Bio'
                  name='bio'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  /* error={profileStore.errorsProfile.bio} */
                  info='Tell us a little about yourself'
                />

                <div className='mb-3'>
                  <button
                    type='button'
                    onClick={() =>
                      setDisplaySocialInputs(!displaySocialInputs)
                    }
                    className='btn btn-light'
                  >
                    Add Social Network Links
                  </button>
                  <span className='text-muted'>{' '}Optional</span>
                </div>
                {socialInputs}
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

export default EditProfile