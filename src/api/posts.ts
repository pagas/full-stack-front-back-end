import { Post } from '../types'

type QueryParams = {
  sortBy?: keyof Post
  sortOrder?: 'ascending' | 'descending'
  author?: string
  tags?: string
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
