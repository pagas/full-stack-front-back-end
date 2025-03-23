import { JSX } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './pages/Blog.tsx'
import { Signup } from './pages/Signup.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/signup',
    element: <Signup />,
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
