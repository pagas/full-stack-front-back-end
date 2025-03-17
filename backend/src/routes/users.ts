import { createUser, loginUser } from '../services/users.js'
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
  app.post('/api/v1/user/login', async (req, res) => {
    try {
      const token = await loginUser(req.body)
      return res.status(200).send({ token })
    } catch (err) {
      console.error('error logging in user', err)
      return res.status(400).send({
        error: 'login failed, did you enter the correct username/password?',
      })
    }
  })
}
