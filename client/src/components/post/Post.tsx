/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { PostItem } from '../posts/PostItem'
import { CommentForm } from './CommentForm'
import { CommentItem } from './CommentItem'
import { PostContext } from '../../context/GlobalContext'
import { Observer, useAsObservableSource } from 'mobx-react-lite'
import PostStore from '../../store/PostStore'

type Props = RouteComponentProps<{ id: string }>
const Post: React.FC<Props> = (props: Props): React.ReactElement => {
  const postStore: PostStore = useAsObservableSource(React.useContext(PostContext))

  postStore.getPost(props.match.params.id)

  const Comments = (<Observer>
    {(): any => (postStore.post.comments.map(comment => {
      return <CommentItem key={comment._id} comment={comment} postId={postStore.post._id} />
    }))}
  </Observer>)

  const postContent = (<Observer>
    {() => (<div>
      <PostItem post={postStore.post} showActions={false} />
      <CommentForm postId={postStore.post._id} />
    </div>)}
  </Observer>)

  return (<div className='post'>
    <div className='container'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <Link to='/feed' className='btn btn-light mb-3'>Back To Feed</Link>
          {postContent}
          {Comments}
        </div>
      </div>
    </div>
  </div>)
}

export default Post