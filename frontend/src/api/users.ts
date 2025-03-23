type SignUpParams = {
  username: string
  password: string
}

// Define the type for the signup response
type SignUpResponse = {
  id: string
  username: string
  token: string
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
