import { JSX } from 'react'
import { Post as PostProps } from '../types'

export function Post({
  title,
  contents,
  author,
  createdAt,
  updatedAt,
}: PostProps): JSX.Element {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
      <footer>
        <small>
          Created at: {new Date(createdAt).toLocaleString()}
          {updatedAt && (
            <>
              <br />
              Updated at: {new Date(updatedAt).toLocaleString()}
            </>
          )}
        </small>
      </footer>
    </article>
  )
}
