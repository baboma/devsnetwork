import *as React from 'react'
import { TextAreaField } from '../common/TextAreaField'
import { LoginContext, PostContext } from '../../context/GlobalContext'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import LoginStore from '../../store/LoginStore'
import PostStore from '../../store/PostStore'

export const PostForm: React.FC = (): React.ReactElement => {
  const postStore: PostStore = useAsObservableSource(React.useContext(PostContext))
  const loginStore: LoginStore = useAsObservableSource(React.useContext(LoginContext))

  const { user } = loginStore
  const [text, setText] = React.useState('')

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const newPost = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      text: text,
    }
    postStore.addPost(newPost)
    setText('')
  }

  return (<Observer>
    {() => (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-info text-white'>Say Somthing...</div>
          <div className='card-body'>
            <form onSubmit={onSubmit}>
              <TextAreaField
                placeholder='Create a post'
                name='text'
                value={text}
                onChange={(e): void => setText(e.target.value)}
                error={postStore.errorCreatePost.text}
              />
              <button type='submit' className='btn btn-success'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    )}
  </Observer>)
}