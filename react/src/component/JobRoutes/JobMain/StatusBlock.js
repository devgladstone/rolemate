import { useState } from 'react'
import { useMutation } from 'urql'
import { UPDATE_JOB_STATUS } from 'graphqlAPI'

export default function StatusBlock({ jobId, status }) {
  const statuses = ['DRAFT', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']
  const [dropdown, setDropdown] = useState(false)

  const [, executeUpdate] = useMutation(UPDATE_JOB_STATUS)

  const updateStatus = async (e) => {
    const status = e.target.value
    const time = new Date().toISOString()
    await executeUpdate({
      id: jobId,
      status,
      time,
      object: {
        job_id: jobId,
        property: 'Status',
        value: status,
        time,
      },
    })
    setDropdown(false)
  }

  return (
    <div>
      <h3 className='pb-1 text-sm leading-5 font-medium text-gray-800'>
        Status
      </h3>
      <div className='relative inline-block text-left'>
        <div>
          <span className='rounded-md shadow-sm'>
            <button
              onClick={() => setDropdown(!dropdown)}
              type='button'
              className='inline-flex justify-center w-full rounded-md border border-gray-300 px-3 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-indigo-300 focus:ring-indigo active:bg-gray-50 active:text-gray-800'
              id='options-menu'
              aria-haspopup='true'
              aria-expanded='true'
            >
              {status}
              <svg
                className='-mr-1 ml-2 h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </span>
        </div>

        {dropdown && (
          <>
            <button
              onClick={() => setDropdown(false)}
              tabIndex='-1'
              className='fixed inset-0 h-full w-full cursor-default'
            ></button>

            <div className='origin-top-right absolute left-0 mt-2 w-36 rounded-md shadow-lg'>
              <div className='rounded-md bg-white ring-1 ring-black ring-opacity-5'>
                <div
                  className='py-1'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='options-menu'
                >
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={updateStatus}
                      className='w-full text-left px-4 py-2 text-sm text-gray-900 leading-5 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
                      role='menuitem'
                      value={status}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
