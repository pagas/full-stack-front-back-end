import { User, IUser } from '../db/models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index.js'

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

export async function loginUser({
  username,
  password,
}: {
  username: string
  password: string
}): Promise<string> {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('invalid username!')
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('invalid password!')
  }

  const token = jwt.sign({ sub: user._id }, JWT_SECRET, {
    expiresIn: '24h',
  })
  return token
}

export async function getUserInfoById(
  userId: string,
): Promise<{ username: string }> {
  try {
    const user = await User.findById(userId)
    if (!user) return { username: userId }
    return { username: user.username }
  } catch (err) {
    console.error(err)
    return { username: userId }
  }
}
