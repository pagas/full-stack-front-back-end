import { CreatePost } from './components/CreatePost.js'
import { PostList } from './components/PostList.js'
import { PostFilter } from './components/PostFilter.js'
import { PostSorting } from './components/PostSorting.js'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api/posts.js'

export function Blog() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

  const posts = postsQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <h1>POST FORM</h1>
      <CreatePost />
      <br />
      <hr />
      <h1>POST FILTER</h1>
      Filter by:
      <PostFilter field='author' />
      <br />
      <h1>POST SORTING</h1>
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <h1>POST LIST</h1>
      <PostList posts={posts} />
    </div>
  )
}
