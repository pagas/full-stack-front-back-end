import express from 'express'
import { initDatabase } from './db/init.js'
await initDatabase()

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

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})
