import { CreatePost } from './components/CreatePost.js'
import { PostList } from './components/PostList.js'
import { PostFilter } from './components/PostFilter.js'
import { PostSorting } from './components/PostSorting.js'
import { useQuery } from '@tanstack/react-query'
import { getPosts, PostSortBy, PostSortOrder } from './api/posts.js'
import { useState, JSX } from 'react'
import { useDebounce } from 'use-debounce'

export function Blog(): JSX.Element {
  const [author, setAuthor] = useState('')
  const [debouncedAuthor] = useDebounce(author, 500) // 500ms delay
  const [sortBy, setSortBy] = useState<PostSortBy>('createdAt')
  const [sortOrder, setSortOrder] = useState<PostSortOrder>('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author: debouncedAuthor, sortBy, sortOrder }],
    queryFn: () => getPosts({ author: debouncedAuthor, sortBy, sortOrder }),
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
      <PostFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />{' '}
      <br />
      <h1>POST SORTING</h1>
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <h1>POST LIST</h1>
      <PostList posts={posts} />
    </div>
  )
}
