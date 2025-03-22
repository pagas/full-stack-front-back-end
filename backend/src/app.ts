import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { requireAuth } from './middleware/jwt.js'
import dotenv from 'dotenv'
import { AuthenticatedRequest } from './types/auth.js'
import cors from 'cors'

dotenv.config()

const app = express()
// Middleware to parse JSON bodies
app.use(express.json())
app.use(cors())

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' })
})

// Login route to issue a JWT token
app.post('/login', (req: Request, res: Response) => {
  const { username } = req.body

  if (!username) {
    res.status(400).json({ error: 'Username is required' })
    return
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})

// Protected route
app.get(
  '/protected',
  requireAuth,
  (req: AuthenticatedRequest, res: Response) => {
    res.json({
      message: 'You have access to this protected route',
      user: req.auth,
    })
  },
)

// Error handling middleware for JWT
app.use(
  (
    err: any,
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: 'Invalid or missing token' })
      return
    }
    next(err)
  },
)

export { app }
