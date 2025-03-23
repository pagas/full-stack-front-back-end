import { JSX } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'
import React from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

export function CreatePost(): JSX.Element {
  const [token] = useAuth()
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error('Token is required to create a post.')
      }
      return createPost(token, { title, contents })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  const isSubmitDisabled = !title.trim() || !contents.trim()

  if (!token) return <div>Please log in to create new posts.</div>

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={isSubmitDisabled || createPostMutation.isPending}
      />

      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  )
}
