import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

// Create the query client instance outside the component
const queryClient = new QueryClient()

interface AppProps {
  children: ReactNode
}

export function App({ children }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  )
}
// import { JSX } from 'react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { AuthContextProvider } from './contexts/AuthContext.jsx'

// const queryClient = new QueryClient()

// export function App({ children }: { children: React.ReactNode }): JSX.Element {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthContextProvider>{children}</AuthContextProvider>
//     </QueryClientProvider>
//   )
// }
