import { Link } from 'react-router-dom'
import { JSX } from 'react'

export function Header(): JSX.Element {
  return (
    <div>
      <Link to='/signup'>Sign Up</Link>
    </div>
  )
}
