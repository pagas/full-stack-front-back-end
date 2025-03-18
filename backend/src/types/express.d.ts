import 'express'

declare global {
  namespace Express {
    interface Request {
      auth?: {
        sub: string // Add other properties if needed
      }
    }
  }
}
