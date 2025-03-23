import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../api/users.js'
import { JSX } from 'react'

interface UserProps {
  id: string
}

interface UserInfo {
  username?: string
}

export function User({ id }: UserProps): JSX.Element {
  const userInfoQuery = useQuery<UserInfo>({
    queryKey: ['users', id],
    queryFn: () => getUserInfo(id),
  })
  const userInfo = userInfoQuery.data ?? {}

  return <strong>{userInfo?.username ?? id}</strong>
}
