import { initDatabase } from './db/init.js'
import dotenv from 'dotenv'
import { app } from './app.js'
import { PORT } from './config/index.js'

dotenv.config() // Load environment variables from .env file

try {
  await initDatabase()
  app.listen(PORT)
  console.info(`express server running on http://localhost:${PORT}`)
} catch (err) {
  console.error('error connecting to database:', err)
}
