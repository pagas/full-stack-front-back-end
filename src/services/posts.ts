import { Post, IPost } from '../db/models/post.js'

// Define the type for query options
interface QueryOptions {
  sortBy?: keyof IPost // Ensure sortBy matches a key in IPost
  sortOrder?: 'ascending' | 'descending' // Restrict to valid sort orders
}

type QueryFilter = {
  author?: string
  tags?: string
}

export async function createPost(data: Partial<IPost>): Promise<IPost> {
  return Post.create(data)
}

async function listPosts(
  query: QueryFilter = {}, // Filter for author or tags
  { sortBy = 'createdAt', sortOrder = 'descending' }: QueryOptions = {},
): Promise<IPost[]> {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options: QueryOptions): Promise<IPost[]> {
  return await listPosts({}, options)
}

export async function listPostsByAuthor(
  author: string,
  options: QueryOptions,
): Promise<IPost[]> {
  return await listPosts({ author }, options)
}

export async function listPostsByTag(
  tags: string,
  options: QueryOptions,
): Promise<IPost[]> {
  return await listPosts({ tags }, options)
}
