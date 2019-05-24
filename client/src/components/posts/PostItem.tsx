import *as React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { LoginContext, PostContext, ProfileContext } from '../../context/GlobalContext'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import PostStore from '../../store/PostStore'
import ProfileStore from '../../store/ProfileStore'
import { LIKES, POST } from '../../models/Post'
import LoginStore from '../../store/LoginStore'

interface POSTITEM {
  post: POST
  showActions?: boolean
}

export const PostItem: React.FC<POSTITEM> = (props: POSTITEM): React.ReactElement => {
  const loginStore: LoginStore = useAsObservableSource(React.useContext(LoginContext))
  const postStore: PostStore = useAsObservableSource(React.useContext(PostContext))
  const profileStore: ProfileStore = useAsObservableSource(React.useContext(ProfileContext))

  const { post, showActions = true } = props

  const onDeleteClick = (id: string): void => {
    postStore.deletePost(id)
  }

  const onLikeClick = (id: string): void => {
    postStore.addLike(id)
  }

  const onUnlikeClick = (id: string): void => {
    postStore.removeLike(id)
  }

  const findUserLike = (likes: LIKES[]): boolean => {
    if (likes.filter(like => like.user === loginStore.user.id).length > 0) {
      return true
    } else {
      return false
    }
  }

  return (<Observer>
    {() => (
      <div className='card card-body mb-3'>
        <div className='row'>
          <div className='col-md-2'>
            <Link to={`/profile/${profileStore.profile.handle}`}>
              <img
                className='rounded-circle d-none d-md-block'
                src={post.avatar}
                alt={profileStore.profile.handle}
              />
            </Link>
            <br />
            <p className='text-center'>{post.name}</p>
          </div>
          <div className='col-md-10'>
            <p className='lead'>{post.text}</p>
            {showActions ?
              (<span>
                <button
                  onClick={() => onLikeClick(post._id)}
                  type='button'
                  className='btn btn-light mr-1'
                >
                  <i className={classnames('fas fa-thumbs-up', { 'text-info': findUserLike(post.likes) })} />
                  <span className='badge badge-light'>{post.likes.length}</span>
                </button>
                <button
                  onClick={() => onUnlikeClick(post._id)}
                  type='button'
                  className='btn btn-light mr-1'
                >
                  <i className='text-secondary fas fa-thumbs-down' />
                </button>
                <Link to={`/post/${post._id}`} className='btn btn-info mr-1'>
                  <i className='fas fa-pencil-alt' />&nbsp;
                  <span className='badge badge-light'>{postStore.post.comments.length}</span>
                </Link>
                {post.user === loginStore.user.id ?
                  (<button onClick={() => onDeleteClick(post._id)} type='button'
                    className='btn btn-danger mr-1'
                  >
                    <i className='far fa-trash-alt' />
                  </button>) : <></>
                }
              </span>) : <></>
            }
          </div>
        </div>
      </div>
    )}
  </Observer>)
}