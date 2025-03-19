import { JSX } from 'react'
interface PostFilterProps {
  field: string // The field prop is required and must be a string
  value: string
  onChange: (value: string) => void // The onChange prop is required and must be a function that takes a string and returns void
}

export function PostFilter({
  field,
  value,
  onChange,
}: PostFilterProps): JSX.Element {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>{field}: </label>
      <input
        type='text'
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
