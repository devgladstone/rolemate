export default function JobFilterRow({ filter, setFilter }) {
  const onChange = ({ target }) => setFilter(target.value)

  return (
    <div className='px-2 sm:px-0'>
      <label htmlFor='filter' className='sr-only'>
        filter
      </label>
      <p className='mb-2 text-sm text-gray-800' id='tag-description'>
        Enter keywords to filter for saved job posts.
      </p>
      <input
        type='text'
        onChange={onChange}
        value={filter}
        id='filter'
        className='my-2 px-2 py-2 text-left shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
        placeholder='"frontend applied seattle reach"'
      />
    </div>
  )
}
