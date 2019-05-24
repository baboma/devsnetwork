import React from 'react'
import { Route, RouteComponentProps, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Landing } from './components/layout/Landing'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { SecureRoute } from './components/common/SecureRoute'
import { PageNotFound } from './PageNotFound/PageNotFound'
//import { Dashboard } from './components/dashboard/Dashboard'
//import { EditProfile } from './components/dashboard/edit-profile/EditProfile'
//import { AddEducation } from './components/dashboard/add-credentials/AddEducation'
//import { AddExperience } from './components/dashboard/add-credentials/AddExperience'
//import { CreateProfile } from './components/dashboard/create-profile/CreateProfile'
//import { Profile } from './components/profile/Profile'
//import { Profiles } from './components/profiles/Profiles'
//import { Posts } from './components/posts/Posts'
//import { Post } from './components/post/Post'
import './App.css'

type Props = RouteComponentProps
type PostProps = RouteComponentProps<{ id: string }>
type ProfileProps = RouteComponentProps<{ handle: string }>
const Profile = React.lazy((): Promise<{ default: React.ComponentType<ProfileProps> }> =>
  import(/* webpackChunkName: 'Profile' */ './components/profile/Profile'))
const Profiles = React.lazy((): Promise<{ default: React.ComponentType<{}> }> =>
  import(/* webpackChunkName: 'Profiles' */ './components/profiles/Profiles'))
const Posts = React.lazy((): Promise<{ default: React.ComponentType<{}> }> =>
  import(/* webpackChunkName: 'Posts' */ './components/posts/Posts'))
const Post = React.lazy((): Promise<{ default: React.ComponentType<PostProps> }> =>
  import(/* webpackChunkName: 'Post' */ './components/post/Post'))
const CreateProfile = React.lazy((): Promise<{ default: React.ComponentType<Props> }> =>
  import(/* webpackChunkName: 'CreateProfile' */ './components/dashboard/create-profile/CreateProfile'))
const AddExperience = React.lazy((): Promise<{ default: React.ComponentType<Props> }> =>
  import(/* webpackChunkName: 'AddExperience' */ './components/dashboard/add-credentials/AddExperience'))
const AddEducation = React.lazy((): Promise<{ default: React.ComponentType<Props> }> =>
  import(/* webpackChunkName: 'AddEducation' */ './components/dashboard/add-credentials/AddEducation'))
const EditProfile = React.lazy((): Promise<{ default: React.ComponentType<Props> }> =>
  import(/* webpackChunkName: 'EditProfile' */ './components/dashboard/edit-profile/EditProfile'))
const Dashboard = React.lazy((): Promise<{ default: React.ComponentType<{}> }> =>
  import(/* webpackChunkName: 'Dashboard' */ './components/dashboard/Dashboard'))

const fallbackCallback = (<div className='d-flex justify-content-center'>
  <div className='spinner-border' style={{ width: '3rem', height: '3rem' }} role='status'>
    < span className='sr-only'>Loading...</span>
  </div>
</div >)

const App: React.FC = (): React.ReactElement => {
  return (<Router>
    <div className='fluid-container'>
      <Navbar />
      <div style={{ minHeight: '80vh' }}>
        <React.Suspense fallback={fallbackCallback}>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/profiles' component={Profiles} />
            <Route path='/profile/:handle' component={Profile} />
            <SecureRoute path='/dashboard' component={Dashboard} />
            <SecureRoute path='/edit-profile' component={EditProfile} />
            <SecureRoute path='/add-education' component={AddEducation} />
            <SecureRoute path='/add-experience' component={AddExperience} />
            <SecureRoute path='/create-profile' component={CreateProfile} />
            <SecureRoute path='/feed' component={Posts} />
            <SecureRoute path='/post/:id' component={Post} />
            <Route path='*' component={PageNotFound} />
          </Switch>
        </React.Suspense>
      </div>
      <Footer />
    </div>
  </Router>)
}

export default App