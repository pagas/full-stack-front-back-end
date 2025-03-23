import { JSX } from 'react'
import { Post as PostProps } from '../types'
import { formatDistanceToNow } from 'date-fns'

export function Post({
  title,
  contents,
  author,
  createdAt,
  updatedAt,
}: PostProps): JSX.Element {
  const formatRelativeTime = (date: Date): string =>
    formatDistanceToNow(new Date(date), { addSuffix: true }) // e.g., "20 seconds ago"

  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author.username}</strong>
        </em>
      )}
      <footer>
        <small>
          Created: {formatRelativeTime(createdAt)}
          {updatedAt && (
            <>
              <br />
              Updated: {formatRelativeTime(updatedAt)}
            </>
          )}
        </small>
      </footer>
    </article>
  )
}
