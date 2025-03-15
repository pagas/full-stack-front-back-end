import express from 'express'
import { postsRoutes } from './routes/posts.js'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello from Express!!')
})

postsRoutes(app)

export { app }
