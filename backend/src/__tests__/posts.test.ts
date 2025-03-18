import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'

import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../services/posts.js'
import { Post, IPost } from '../db/models/post.js'
import { User, IUser } from '../db/models/user.js'
import { CreatePostData } from '../services/posts.js'

const user1Id = new mongoose.Types.ObjectId()
const user2Id = new mongoose.Types.ObjectId()

const sampleUsers: Partial<IUser>[] = [
  { _id: user1Id, username: 'Daniel Bugl', password: '1234' },
  { _id: user2Id, username: 'Test Author', password: '1234' },
]

const samplePosts: CreatePostData[] = [
  { title: 'Learning Redux', contents: 'Content', tags: ['redux'] },
  { title: 'Learn React Hooks', contents: 'Content', tags: ['react'] },
  {
    title: 'Full-Stack React Projects',
    contents: 'Content',
    tags: ['react', 'nodejs'],
  },
  { title: 'Guide to TypeScript', contents: 'Content' },
]

let createdSamplePosts: IPost[] = []
let createdSampleUsers: IUser[] = []

beforeEach(async () => {
  await Post.deleteMany({})
  await User.deleteMany({})

  for (const user of sampleUsers) {
    const createdUser = new User(user)
    createdSampleUsers.push(await createdUser.save())
  }

  createdSamplePosts = []
  for (const post of samplePosts) {
    const createdPost = new Post({
      ...post,
      author: user1Id,
    })
    createdSamplePosts.push(await createdPost.save())
  }
})

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const postData = {
      title: 'Hello Mongoose!',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(user1Id.toString(), postData)

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)

    expect(foundPost).toEqual(expect.objectContaining(postData))
    expect(foundPost?.createdAt).toBeInstanceOf(Date)
    expect(foundPost?.updatedAt).toBeInstanceOf(Date)
  })

  test('without title should fail', async () => {
    const postData = {
      title: '',
      contents: 'Post with no title',
      tags: ['empty'],
    }

    try {
      await createPost(user1Id.toString(), postData)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      if (err instanceof mongoose.Error.ValidationError) {
        expect(err.message).toContain('`title` is required')
      } else {
        throw err
      }
    }
  })

  test('with minimal parameters should succeed', async () => {
    const postData = {
      title: 'Only a title',
      contents: 'This post has no tags.',
    }
    const createdPost = await createPost(user1Id.toString(), postData)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts({})
    expect(posts.length).toEqual(createdSamplePosts.length)
  })

  test('should return posts sorted by creation date descending by default', async () => {
    const posts = await listAllPosts({})
    const sortedSamplePosts = [...createdSamplePosts].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )
    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    )
  })

  test('should take into account provided sorting options', async () => {
    const posts = await listAllPosts({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSamplePosts = [...createdSamplePosts].sort(
      (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
    )
    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    )
  })

  test('should be able to filter posts by author', async () => {
    const posts = await listPostsByAuthor('Daniel Bugl', {})
    expect(posts.length).toBe(4)
  })

  test('should be able to filter posts by tag', async () => {
    const posts = await listPostsByTag(['nodejs'], {})
    expect(posts.length).toBe(1)
  })
})

describe('getting a post', () => {
  test('should return the full post', async () => {
    const post = await getPostById(createdSamplePosts[0]._id.toString())
    expect(post).not.toBeNull()
    expect(post?.toObject()).toEqual(createdSamplePosts[0].toObject())
  })
  test('should fail if the id does not exist', async () => {
    const post = await getPostById('000000000000000000000000')
    expect(post).toBeNull()
  })
})

describe('updating posts', () => {
  test('should update the specified property', async () => {
    await updatePost(user1Id.toString(), createdSamplePosts[0]._id.toString(), {
      title: 'Updated Title',
      contents: 'Updated Content',
      tags: ['updated'],
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost).not.toBeNull()
    expect(updatedPost?.title).toEqual('Updated Title')
    expect(updatedPost?.contents).toEqual('Updated Content')
    expect(updatedPost?.tags).toEqual(['updated'])
  })

  test('should not update other properties', async () => {
    const beforeUpdate = await Post.findById(createdSamplePosts[0]._id)
    await updatePost(user1Id.toString(), createdSamplePosts[0]._id.toString(), {
      title: 'Updated title',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost).not.toBeNull()
    expect(updatedPost?.title).toEqual('Updated title')
    expect(updatedPost?.contents).toEqual(beforeUpdate?.contents)
    expect(updatedPost?.tags).toEqual(beforeUpdate?.tags)
  })

  test('should update the updatedAt timestamp', async () => {
    await updatePost(user1Id.toString(), createdSamplePosts[0]._id.toString(), {
      title: 'Updated title',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost).not.toBeNull()
    expect(updatedPost?.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    )
  })

  test('should fail if the id does not exist', async () => {
    const post = await updatePost(
      user1Id.toString(),
      '000000000000000000000000',
      {
        author: user2Id,
      },
    )
    expect(post).toBeNull()
  })

  test('should fail if the user is not the author', async () => {
    const post = await updatePost(
      user2Id.toString(),
      createdSamplePosts[0]._id.toString(),
      {
        title: 'Updated title',
      },
    )
    expect(post).toBeNull()
  })
})

describe('deleting posts', () => {
  test('should remove the post from the database', async () => {
    const result = await deletePost(
      user1Id.toString(),
      createdSamplePosts[0]._id.toString(),
    )
    expect(result.deletedCount).toEqual(1)
    const deletedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(deletedPost).toEqual(null)
  })
  test('should fail if the id does not exist', async () => {
    const result = await deletePost(
      user1Id.toString(),
      '000000000000000000000000',
    )
    expect(result.deletedCount).toEqual(0)
  })

  test('should fail if the user is not the author', async () => {
    const result = await deletePost(
      user2Id.toString(),
      createdSamplePosts[0]._id.toString(),
    )
    expect(result.deletedCount).toEqual(0)
  })
})
