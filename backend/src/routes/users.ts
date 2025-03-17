import { createUser } from '../services/users.js'
import { Express } from 'express'

export function userRoutes(app: Express): void {
  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res.status(201).json({ username: user.username })
    } catch (err) {
      console.error('error creating user', err)
      return res.status(400).json({
        error: 'failed to create the user, does the username already exist?',
      })
    }
  })
}
