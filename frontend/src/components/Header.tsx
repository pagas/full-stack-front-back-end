import { Link } from 'react-router-dom'
import { JSX } from 'react'

export function Header(): JSX.Element {
  return (
    <div>
      <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>{' '}
    </div>
  )
}
