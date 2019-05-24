import * as transport from '../api/transport'
import { AxiosPromise } from 'axios'
import { POST } from '../models/Post'

export interface POSTDATA {
  id: string
  name: string
  avatar: string
  text: string
}

export interface COMMENTDATA {
  text: string
  name: string
  avatar: string
}

// Add post
export const addPost = (postData: POSTDATA): AxiosPromise<POST> => {
  return transport.post<POST>('/api/posts', postData)
}

// Delete post
export const deletePost = (id: string): AxiosPromise<POST[]> => {
  return transport.del(`/api/posts/${id}`)
}

// Add comment
export const addComment = (postId: string, commentData: COMMENTDATA): AxiosPromise<POST> => {
  return transport.post<POST>(`/api/posts/comment/${postId}`, commentData)
}

// Delete comment
export const deleteComment = (postId: string, commentId: string): AxiosPromise<POST> => {
  return transport.del(`/api/posts/comment/${postId}/${commentId}`)
}

// Get Post
export const getPost = (id: string): AxiosPromise<POST> => {
  return transport.get<POST>(`/api/posts/${id}`)
}

// Get posts
export const getPosts = (): AxiosPromise<POST[]> => {
  return transport.get<POST[]>('/api/posts')
}

// Add like
export const addLike = (id: string): AxiosPromise<POST> => {
  return transport.post<POST>(`/api/posts/like/${id}`)
}

// Remove like
export const removeLike = (id: string): AxiosPromise<POST> => {
  return transport.post<POST>(`/api/posts/unlike/${id}`)
}