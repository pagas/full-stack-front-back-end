import { describe, expect, test, beforeEach } from '@jest/globals'

import {
  createUser,
  listUsers,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
  getUserInfoById,
} from '../services/users.js'
import { User } from '../db/models/user.js'
import { Types } from 'mongoose'

// let createdSampleUsers: IUser[] = []
beforeEach(async () => {
  // Clear the User collection before each test
  await User.deleteMany({})
})

describe('User Service', () => {
  test('should create a user', async () => {
    const userData = { username: 'testuser', password: 'password123' }
    const createdUser = await createUser(userData)

    expect(createdUser).toBeDefined()
    expect(createdUser.username).toBe(userData.username)
    expect(createdUser.password).not.toBe(userData.password) // Password should be hashed
  })

  test('should list all users', async () => {
    await createUser({ username: 'user1', password: 'password1' })
    await createUser({ username: 'user2', password: 'password2' })

    const users = await listUsers()

    expect(users.length).toBe(2)
    expect(users[0].username).toBe('user1')
    expect(users[1].username).toBe('user2')
  })

  test('should get a user by ID', async () => {
    const userData = { username: 'testuser', password: 'password123' }
    const createdUser = await createUser(userData)

    const foundUser = await getUserById(createdUser._id.toString())

    expect(foundUser).toBeDefined()
    expect(foundUser?.username).toBe(userData.username)
  })

  test('should delete a user', async () => {
    const userData = { username: 'testuser', password: 'password123' }
    const createdUser = await createUser(userData)

    const deletedUser = await deleteUser(createdUser._id.toString())

    expect(deletedUser).toBeDefined()
    expect(deletedUser?.username).toBe(userData.username)

    const users = await listUsers()
    expect(users.length).toBe(0) // Ensure the user is deleted
  })

  test('should update a user', async () => {
    const userData = { username: 'testuser', password: 'password123' }
    const createdUser = await createUser(userData)

    const updatedData = { username: 'updateduser' }
    const updatedUser = await updateUser(
      createdUser._id.toString(),
      updatedData,
    )

    expect(updatedUser).toBeDefined()
    expect(updatedUser?.username).toBe(updatedData.username)
  })
})

describe('loginUser', () => {
  test('should return a token for valid credentials', async () => {
    // Arrange: Create a user
    const userData = { username: 'testuser', password: 'password123' }
    await createUser(userData)

    // Act: Attempt to log in
    const token = await loginUser(userData)

    // Assert: Ensure a token is returned
    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
  })

  test('should throw an error for invalid username', async () => {
    // Arrange: Create a user
    const userData = { username: 'testuser', password: 'password123' }
    await createUser(userData)

    // Act & Assert: Attempt to log in with an invalid username
    await expect(
      loginUser({ username: 'invaliduser', password: 'password123' }),
    ).rejects.toThrow('invalid username!')
  })

  test('should throw an error for invalid password', async () => {
    // Arrange: Create a user
    const userData = { username: 'testuser', password: 'password123' }
    await createUser(userData)

    // Act & Assert: Attempt to log in with an invalid password
    await expect(
      loginUser({ username: 'testuser', password: 'wrongpassword' }),
    ).rejects.toThrow('invalid password!')
  })
})

describe('getUserInfoById', () => {
  test('should return the username for a valid user ID', async () => {
    // Arrange: Create a user
    const userData = { username: 'testuser', password: 'password123' }
    const createdUser = await createUser(userData)

    // Act: Get the user info
    const userInfo = await getUserInfoById(createdUser._id.toString())

    // Assert: Ensure the username is returned
    expect(userInfo).toBeDefined()
    expect(userInfo.username).toBe(userData.username)
  })

  test('should return the user ID for an invalid user ID', async () => {
    // Act: Get the user info for an invalid user ID
    const invalidUserId = new Types.ObjectId().toString()
    const userInfo = await getUserInfoById(invalidUserId)

    // Assert: Ensure the user ID is returned
    expect(userInfo).toBeDefined()
    expect(userInfo.username).toBe(invalidUserId)
  })
})
