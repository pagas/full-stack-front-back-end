import { Post } from '../types'

export type PostSortBy = keyof Post
export type PostSortOrder = 'ascending' | 'descending'

type QueryParams = {
  sortBy?: PostSortBy
  sortOrder?: PostSortOrder
  author?: string
  tags?: string
}

interface PostData {
  title: string
  author: string
  contents: string
}

export const getPosts = async (
  queryParams: QueryParams = {},
): Promise<Post[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

export const createPost = async (post: PostData): Promise<Post> => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  return await res.json()
}
