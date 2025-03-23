import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

// Define the shape of the AuthContext
type AuthContextType = [string | null, Dispatch<SetStateAction<string | null>>]

export const AuthContext = createContext<AuthContextType | null>(null)

// Define the props for the AuthContextProvider
interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null)

  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the AuthContext
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}
