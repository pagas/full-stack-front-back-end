import { JSX } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'
import React from 'react'

export function CreatePost(): JSX.Element {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, contents }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  const isSubmitDisabled = !title.trim() || !author.trim() || !contents.trim()

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
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
