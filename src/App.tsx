import { CreatePost } from './components/CreatePost.jsx'
import { PostList } from './components/PostList.jsx'
import { PostFilter } from './components/PostFilter.jsx'
import { PostSorting } from './components/PostSorting.jsx'
import { Post as PostProps } from './types'

const posts: PostProps[] = [
  {
    _id: '1',
    title: 'Full-Stack React Projects',
    contents: "Let's become full-stack developers!",
    author: 'Daniel Bugl',
  },
  {
    _id: '2',
    title: 'Hello React!',
  },
]

export function App() {
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
