export interface LIKES {
  _id: string
  user: string // aothor of likes
}

export interface COMMENTS {
  _id: string // id of the comment
  user: string // id of the author of the comment
  name: string  // author of the post
  avatar: string // avatar of the author of the post
  text: string
  date: string
}

export interface POST {
  _id: string // id of the post
  user: string  // id of the author of the comment
  name: string  // author of the post
  avatar: string // avatar of the author of the post
  date: string // date of the post
  text: string
  likes: LIKES[]
  comments: COMMENTS[]
}