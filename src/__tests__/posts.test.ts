import mongoose from 'mongoose'
import { describe, expect, test } from '@jest/globals'

import { createPost } from '../services/posts.js'
import { Post, IPost } from '../db/models/post.js'

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post: Partial<IPost> = {
      title: 'Hello Mongoose!',
      author: 'Daniel Bugl',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    }
    const createdPost = await createPost(post)

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(createdPost._id)

    expect(foundPost).toEqual(expect.objectContaining(post))
    expect(foundPost?.createdAt).toBeInstanceOf(Date)
    expect(foundPost?.updatedAt).toBeInstanceOf(Date)
  })

  test('without title should fail', async () => {
    const post: Partial<IPost> = {
      author: 'Daniel Bugl',
      contents: 'Post with no title',
      tags: ['empty'],
    }

    try {
      await createPost(post)
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
    const post: Partial<IPost> = {
      title: 'Only a title',
    }
    const createdPost = await createPost(post)
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})
