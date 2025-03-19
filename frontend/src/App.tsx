import { JSX } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './Blog.jsx'

const queryClient = new QueryClient()

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Blog />
    </QueryClientProvider>
  )
}
