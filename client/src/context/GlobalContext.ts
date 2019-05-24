import React from 'react'
import RegisterStore, { registerStore } from '../store/RegisterStore'
import LoginStore, { loginStore } from '../store/LoginStore'
import ProfileStore, { profileStore } from '../store/ProfileStore'
import PostStore, { postStore } from '../store/PostStore'

export const RegisterContext: React.Context<RegisterStore> = React.createContext(registerStore)
export const LoginContext: React.Context<LoginStore> = React.createContext(loginStore)
export const ProfileContext: React.Context<ProfileStore> = React.createContext(profileStore)
export const PostContext: React.Context<PostStore> = React.createContext(postStore)