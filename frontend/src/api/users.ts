type SignUpParams = {
  username: string
  password: string
}

type LoginParams = {
  username: string
  password: string
}

// Define the type for the signup response
type SignUpResponse = {
  username: string
}

export const signup = async ({
  username,
  password,
}: SignUpParams): Promise<SignUpResponse> => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('failed to sign up')
  return await res.json()
}

type LoginResponse = {
  token: string
}

export const login = async ({
  username,
  password,
}: LoginParams): Promise<LoginResponse> => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('failed to login')
  return await res.json()
}
