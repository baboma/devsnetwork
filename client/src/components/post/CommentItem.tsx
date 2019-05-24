import * as React from 'react'
import { LoginContext, PostContext } from '../../context/GlobalContext'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import PostStore from '../../store/PostStore'
import LoginStore from '../../store/LoginStore'
import { COMMENTS } from '../../models/Post'

interface COMMENTITEM {
  postId: string
  comment: COMMENTS
}

export const CommentItem: React.FC<COMMENTITEM> = (props: COMMENTITEM): React.ReactElement => {
  const loginStore: LoginStore = useAsObservableSource(React.useContext(LoginContext))
  const postStore: PostStore = useAsObservableSource(React.useContext(PostContext))
  ////////////////////
  //postStore.getPosts()
  ////////////////////
  const { comment, postId } = props

  const onDeleteClick = (postId: string, commentId: string): void => {
    postStore.deleteComment(postId, commentId)
  }
  /* (<Observer>
      {() =>  */
  return (<Observer>
    {() => (<div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img className='rounded-circle d-none d-md-block' src={comment.avatar} alt='comment user' />
          </a>
          <br />
          <p className='text-center'>{comment.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{comment.text}</p>
          {comment.user === loginStore.user.id ?
            (<button type='button' className='btn btn-danger mr-1'
              onClick={(): void => onDeleteClick(postId, comment._id)}
            >
              <i className='far fa-trash-alt' />
            </button>) : <></>}
        </div>
      </div>
    </div>)}
  </Observer>)
}