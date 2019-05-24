/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { PostForm } from './PostForm'
import { LoginContext, PostContext, ProfileContext } from '../../context/GlobalContext'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import PostStore from '../../store/PostStore'
import { PostItem } from './PostItem'
import LoginStore from '../../store/LoginStore'
import ProfileStore from '../../store/ProfileStore'

const Posts: React.FC = (): React.ReactElement => {
  const postStore: PostStore = useAsObservableSource(React.useContext(PostContext))
  const loginStore: LoginStore = useAsObservableSource(React.useContext(LoginContext))
  const profileStore: ProfileStore = useAsObservableSource(React.useContext(ProfileContext))
  postStore.getPosts()
  loginStore.getCurrentUser()
  profileStore.getCurrentProfile()

  const postContent = <Observer>{(): any => (postStore.posts.map(post => <PostItem key={post._id} post={post} />))}</Observer>

  return (<div className='feed'>
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <PostForm />
          {postContent}
        </div>
      </div>
    </div>
  </div>)
}

export default Posts