interface PostFilterProps {
  field: string // The field prop is required and must be a string
}

export function PostFilter({ field }: PostFilterProps) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>{field}: </label>
      <input type='text' name={`filter-${field}`} id={`filter-${field}`} />
    </div>
  )
}
