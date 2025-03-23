import { User } from './db/models/user.js'
import { Post } from './db/models/post.js'
import { initDatabase } from './db/init.js'
import { createUser } from './services/users.js'

const mongooseInstance = await initDatabase()

const seedData = async (): Promise<void> => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Post.deleteMany({})

    // Create users
    const user1 = await createUser({
      username: 'dan',
      password: 'user123',
    })
    const user2 = await createUser({
      username: 'mark',
      password: 'user123',
    })

    // Create blogs
    await Post.create([
      {
        title: 'First Post',
        contents: 'This is my first post',
        author: user1._id,
      },
      {
        title: 'Another post',
        contents: 'This is another post',
        author: user2._id,
      },
    ])

    console.log('Database seeded successfully!')
    mongooseInstance.connection.close()
  } catch (err) {
    console.error('Seeding failed:', err)
    mongooseInstance.connection.close()
  }
}

// Run script
seedData()
