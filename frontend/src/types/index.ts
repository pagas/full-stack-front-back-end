export type Post = {
  _id: string
  title: string
  contents: string
  author: User
  createdAt: Date
  updatedAt: Date
}

export type User = {
  _id: string
  username: string
}
