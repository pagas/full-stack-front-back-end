import { Post, IPost } from '../db/models/post.js'
import { User, IUser } from '../db/models/user.js'
import { FilterQuery } from 'mongoose'

// Define the type for query options
interface QueryOptions {
  sortBy?: keyof IPost // Ensure sortBy matches a key in IPost
  sortOrder?: 'ascending' | 'descending' // Restrict to valid sort orders
}

type QueryFilter = {
  author?: string
  tags?: string[]
}

type IPostResponse = Omit<IPost, 'author'> & { author: IUser }
export type QueryParams = QueryOptions & QueryFilter

export type CreatePostData = {
  title: string
  contents: string
  tags?: string[]
}

export async function createPost(
  authorId: string,
  { title, contents, tags }: CreatePostData,
): Promise<IPost> {
  return Post.create({ title, author: authorId, contents, tags })
}

async function listPosts(
  query: FilterQuery<IPost> = {},
  { sortBy = 'createdAt', sortOrder = 'descending' }: QueryOptions = {},
): Promise<IPostResponse[]> {
  return await Post.find(query)
    .sort({ [sortBy]: sortOrder })
    .populate<{ author: IUser }>('author', '_id username')
    .lean()
}

export async function listAllPosts(options: QueryOptions): Promise<IPost[]> {
  return await listPosts({}, options)
}

export async function listPostsByAuthor(
  authorUsername: string,
  options: QueryOptions,
): Promise<IPost[]> {
  const matchingUsers = await User.find(
    { username: { $regex: authorUsername, $options: 'i' } }, // Case-insensitive search
    { _id: 1 }, // Only return the _id field
  )

  const userIds = matchingUsers.map((user) => user._id)

  // If no matching users are found, return an empty array
  if (userIds.length === 0) {
    return []
  }

  if (!matchingUsers) return []
  return await listPosts({ author: { $in: userIds } }, options)
}

export async function listPostsByTag(
  tags: string[],
  options: QueryOptions,
): Promise<IPost[]> {
  return await listPosts({ tags: { $in: tags } }, options)
}

export async function getPostById(postId: string): Promise<IPost | null> {
  return await Post.findById(postId)
}

export async function updatePost(
  authorId: string,
  postId: string,
  { title, contents, tags }: Partial<IPost>,
): Promise<IPost | null> {
  return await Post.findOneAndUpdate(
    { _id: postId, author: authorId },
    { $set: { title, contents, tags } },
    { new: true },
  )
}

/*
You may want to set a deletedOn timestamp instead of deleting it right away. 
Then, set up a function that gets all documents that have been deleted for more 
than 30 days and delete them. Of course, this means that we need to always filter 
out already deleted posts in the listPosts function and that we need to write test cases for this behavior!
*/
export async function deletePost(
  authorId: string,
  postId: string,
): Promise<{ deletedCount?: number }> {
  return await Post.deleteOne({ _id: postId, author: authorId })
}
