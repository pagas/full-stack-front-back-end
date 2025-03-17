import { User, IUser } from '../db/models/user.js'
import bcrypt from 'bcryptjs'

type UserInput = {
  username: string
  password: string
}

export async function createUser({
  password,
  username,
}: UserInput): Promise<IUser> {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashedPassword })
  return await user.save()
}

export async function listUsers(): Promise<IUser[]> {
  return User.find()
}

export async function getUserById(id: string): Promise<IUser | null> {
  return User.findById(id)
}

export async function deleteUser(id: string): Promise<IUser | null> {
  return User.findByIdAndDelete(id)
}

export async function updateUser(
  id: string,
  data: Partial<IUser>,
): Promise<IUser | null> {
  return User.findByIdAndUpdate(id, data, {
    new: true,
  })
}
