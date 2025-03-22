import { Request } from 'express'

export interface AuthPayload {
  username?: string
  sub: string
  // Add additional JWT fields if needed (e.g., role, userId, email)
}

export interface AuthenticatedRequest extends Request {
  auth?: AuthPayload
}
