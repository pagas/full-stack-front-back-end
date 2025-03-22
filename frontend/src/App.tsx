import { JSX } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './pages/Blog.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
])

const queryClient = new QueryClient()

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
