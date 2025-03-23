import { JSX } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './pages/Blog.tsx'
import { Signup } from './pages/Signup.tsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { Login } from './pages/Login.jsx'

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
  {
    path: '/login',
    element: <Login />,
  },
])

const queryClient = new QueryClient()

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
