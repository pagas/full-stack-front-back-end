import { Express } from 'express'
import { requireAuth } from '../middleware/jwt.js'
import type { AuthenticatedRequest } from '../types/auth.js'

import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  QueryParams,
  createPost,
  updatePost,
  deletePost,
} from '../services/posts.js'

export function postsRoutes(app: Express): void {
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tags } = req.query as QueryParams
    const options = { sortBy, sortOrder }

    try {
      if (author && tags) {
        return res
          .status(400)
          .json({ error: 'query by either author or tag, not both' })
      } else if (author) {
        return res.json(await listPostsByAuthor(author, options))
      } else if (tags) {
        return res.json(await listPostsByTag(tags, options))
      } else {
        return res.json(await listAllPosts(options))
      }
    } catch (err) {
      console.error('error listing posts', err)
      return res.status(500).end()
    }
  })

  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
      const post = await getPostById(id)
      if (post === null) return res.status(404).end()
      return res.json(post)
    } catch (err) {
      console.error('error getting post', err)
      return res.status(500).end()
    }
  })

  app.post(
    '/api/v1/posts',
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const post = await createPost(req.auth!.sub, req.body)
        res.json(post)
      } catch (err) {
        console.error('error creating post', err)
        res.status(500).end()
      }
    },
  )

  app.patch(
    '/api/v1/posts/:id',
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const post = await updatePost(req.auth!.sub, req.params.id, req.body)
        return res.json(post)
      } catch (err) {
        console.error('error updating post', err)
        return res.status(500).end()
      }
    },
  )

  app.delete(
    '/api/v1/posts/:id',
    requireAuth,
    async (req: AuthenticatedRequest, res) => {
      try {
        const { deletedCount } = await deletePost(req.auth!.sub, req.params.id)
        if (deletedCount === 0) return res.sendStatus(404)
        return res.status(204).end()
      } catch (err) {
        console.error('error deleting post', err)
        return res.status(500).end()
      }
    },
  )
}
