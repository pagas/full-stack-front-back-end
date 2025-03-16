import { JSX } from 'react'

import { PostSortBy, PostSortOrder } from '../api/posts'

interface PostSortingProps {
  fields: string[] // The fields prop is required and must be an array of strings
  value: PostSortBy
  onChange: (value: PostSortBy) => void // The onChange prop is required and must be a function that takes a string and returns void
  orderValue: PostSortOrder
  onOrderChange: (orderValue: PostSortOrder) => void
}

export function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}: PostSortingProps): JSX.Element {
  return (
    <div>
      <label htmlFor='sortBy'>Sort By: </label>
      <select
        name='sortBy'
        id='sortBy'
        value={value}
        onChange={(e) => onChange(e.target.value as PostSortBy)}
      >
        {fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      {' / '}
      <label htmlFor='sortOrder'>Sort Order: </label>
      <select
        name='sortOrder'
        id='sortOrder'
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value as PostSortOrder)}
      >
        <option value='ascending'>ascending</option>
        <option value='descending'>descending</option>
      </select>
    </div>
  )
}
