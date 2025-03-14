import { Post, IPost } from '../db/models/post.js'

export async function createPost(data: Partial<IPost>): Promise<IPost> {
  return Post.create(data)
}
