import { initDatabase } from './db/init.js'
import dotenv from 'dotenv'
import { app } from './app.js'

dotenv.config() // Load environment variables from .env file

// import { Post } from './db/models/post.js'

// const post = new Post({
//   title: 'Hello Mongoose!',
//   author: 'Daniel Bugl',
//   contents: 'This post is stored in a MongoDB database using Mongoose.',
//   tags: ['mongoose', 'mongodb'],
// })

// await post.save()

// const posts = await Post.find()
// console.log(posts)

try {
  await initDatabase()
  const PORT = process.env.PORT
  app.listen(PORT)
  console.info(`express server running on http://localhost:${PORT}`)
} catch (err) {
  console.error('error connecting to database:', err)
}
