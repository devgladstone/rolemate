import { useState } from 'react'

export default function StatusFilterDropdown({
  tagsFilter,
  setTags,
  userTags,
}) {
  const [dropdown, setDropdown] = useState(false)

  const toggleDropdown = () => setDropdown(!dropdown)

  const addTag = ({ target }) => {
    setTags(tagsFilter.concat(target.value))
  }

  const removeTag = ({ target }) => {
    const newList = tagsFilter.filter((tag) => tag !== target.value)
    setTags(newList)
  }

  const clearFilter = () => {
    setTags([])
    setDropdown(false)
  }

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          onClick={toggleDropdown}
          className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
          id='options-menu'
          aria-haspopup='true'
          aria-expanded='true'
        >
          Tags
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {dropdown && (
        <>
          <button
            onClick={() => setDropdown(false)}
            tabIndex='-1'
            className='fixed inset-0 h-full w-full cursor-default'
          ></button>
          <div className='origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              <div className='grid grid-cols-2 divide-x divide-x-200'>
                {userTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={tagsFilter.includes(tag) ? removeTag : addTag}
                    className={`w-full text-left truncate px-4 py-2 text-sm font-normal leading-5 text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900
                ${
                  tagsFilter.includes(tag)
                    ? 'bg-blue-300 focus:bg-blue-400 hover:bg-blue-400'
                    : 'focus:bg-gray-100 hover:bg-gray-100'
                }
                `}
                    role='menuitem'
                    value={tag}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <button
                onClick={clearFilter}
                className='w-full border-t border-gray-300 text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
                role='menuitem'
                value={tagsFilter}
              >
                Clear
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
