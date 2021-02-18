import { useState } from 'react'

export default function StatusFilterDropdown({ status, setStatus }) {
  const statuses = ['DRAFT', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']
  const [dropdown, setDropdown] = useState(false)

  const toggleDropdown = () => setDropdown(!dropdown)

  const onClick = ({ target }) => {
    setStatus(target.value)
    setDropdown(false)
  }

  const clearFilter = () => {
    setStatus('')
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
          {status !== '' ? status : 'Status'}
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
          <div className='origin-top-right absolute right-0 mt-2 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={onClick}
                  className='w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
                  role='menuitem'
                  value={status}
                >
                  {status}
                </button>
              ))}
              <button
                onClick={clearFilter}
                className='w-full border-t border-gray-300 text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
                role='menuitem'
                value={status}
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
