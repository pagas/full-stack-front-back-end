import mongoose from 'mongoose'
import { DATABASE_URL } from './config/config.js'

export function initDatabase(): Promise<typeof mongoose> {
  mongoose.connection.on('open', () => {
    console.info('Successfully connected to database:', DATABASE_URL)
  })

  mongoose.connection.on('error', (err) => {
    console.error('Database connection error:', err)
  })

  return mongoose.connect(DATABASE_URL)
}
