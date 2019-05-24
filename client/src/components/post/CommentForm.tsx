import * as React from 'react'
import { LoginContext, PostContext } from '../../context/GlobalContext'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import PostStore from '../../store/PostStore'
import { COMMENTDATA } from '../../actions/postAction'
import { TextAreaField } from '../common/TextAreaField'
import LoginStore from '../../store/LoginStore'

interface POSTID {
  postId: string
}

export const CommentForm: React.FC<POSTID> = (props: POSTID): React.ReactElement => {
  const loginStore: LoginStore = useAsObservableSource(React.useContext(LoginContext))
  const postStore: PostStore = useAsObservableSource(React.useContext(PostContext))
  const [text, setText] = React.useState('')

  const { postId } = props

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const newComment: COMMENTDATA = {
      text: text,
      name: loginStore.user.name,
      avatar: loginStore.user.avatar
    }
    postStore.addComment(postId, newComment)
    setText('')
  }

  return (<Observer>
    {() => (<div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>
          Make a comment...
        </div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <TextAreaField
                placeholder='Reply to post'
                name='text'
                value={text}
                onChange={(e): void => setText(e.target.value)}
                error={postStore.errorAddComment.text}
              />
            </div>
            <button type='submit' className='btn btn-success'>Submit</button>
          </form>
        </div>
      </div>
    </div>)}
  </Observer>)
}