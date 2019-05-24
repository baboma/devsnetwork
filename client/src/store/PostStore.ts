import { action, observable } from 'mobx'
import { COMMENTDATA, POSTDATA, addLike, addPost, deletePost } from '../actions/postAction'
import { addComment, deleteComment, getPost, getPosts, removeLike } from '../actions/postAction'
import { POST } from '../models/Post'

interface ERRORS {
  text?: string
  notauthorized?: string
  alreadyliked?: string
  notliked?: string
  nopostsfound?: string
  nopostfound?: string
  commentnotexists?: string
}
interface RESPONSE {
  success: true
}

export default class PostStore {
  // error from submitting a post
  @observable public errorCreatePost: ERRORS = { text: '' }
  // error from deleting a post
  @observable public errorDeletePost: ERRORS = { notauthorized: '' }
  @observable public erroraddLike: ERRORS = { alreadyliked: '' }
  @observable public errorremoveLike: ERRORS = { notliked: '' }
  @observable public errorPosts: ERRORS = { nopostsfound: '' }
  @observable public errorPost: ERRORS = { nopostfound: '' }
  @observable public errorAddComment: ERRORS = { text: '' }
  @observable public errordeleteComment: ERRORS = { commentnotexists: '' }
  // all posts
  @observable public posts: POST[] = [{
    _id: '',
    user: '',
    name: '',
    avatar: '',
    date: '',
    text: '',
    likes: [{ _id: '', user: '' }],
    comments: [{ _id: '', user: '', name: '', avatar: '', text: '', date: '' }]
  }]
  // current post
  @observable public post: POST = {
    _id: '',
    user: '',
    name: '',
    avatar: '',
    date: '',
    text: '',
    likes: [{ _id: '', user: '' }],
    comments: [{ _id: '', user: '', name: '', avatar: '', text: '', date: '' }]
  }

  @action
  public getPost(id: string): void {
    getPost(id)
      .then(response => this.post = response.data)
      .catch(error => this.errorPost = error.response.data)
  }

  @action
  public getPosts(): void {
    getPosts()
      .then(response => this.posts = response.data)
      .catch(error => this.errorPosts = error.response.data)
  }

  @action
  public addPost(postData: POSTDATA): void {
    addPost(postData)
      .then(response => this.posts.unshift(response.data))
      .catch(error => this.errorCreatePost = error.response.data)
  }

  @action
  public deletePost(id: string): void {
    deletePost(id)
      .then(response => this.getPosts()) // this.posts = this.posts.filter(post => post._id !== id)
      .catch(error => this.errorDeletePost = error.response.data)
  }

  @action
  public addLike(id: string): void {
    addLike(id)
      .then(response => this.getPosts())
      .catch(error => this.erroraddLike = error.response.data)
  }

  @action
  public removeLike(id: string): void {
    removeLike(id)
      .then(response => this.getPosts())
      .catch(error => this.errorremoveLike = error.response.data)
  }

  @action
  public addComment(postId: string, commentData: COMMENTDATA): void {
    addComment(postId, commentData)
      .then(response => this.post = response.data)
      .catch(error => this.errorAddComment = error.response.data)
  }

  @action
  public deleteComment(postId: string, commentId: string): void {
    deleteComment(postId, commentId)
      .then(response => this.post = response.data) // this.posts = this.posts.filter(post => post._id !== postId)
      .catch(error => this.errordeleteComment = error.response.data)
  }
}

export const postStore = new PostStore()