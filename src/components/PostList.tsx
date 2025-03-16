import { Post } from './Post'
import { Fragment } from 'react'
import { Post as PostProps } from '../types'
import { JSX } from 'react'
interface PostListProps {
  posts: PostProps[] // The posts prop is an array of PostProps
}

export function PostList({ posts = [] }: PostListProps): JSX.Element {
  return (
    <div>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </div>
  )
}
