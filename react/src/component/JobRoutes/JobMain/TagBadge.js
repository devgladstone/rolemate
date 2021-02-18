import { useState } from 'react'
import { useMutation } from 'urql'
import { DELETE_JOB_TAG } from 'graphqlAPI'

export default function TagBadge({ jobId, tag }) {
  const [tagExpand, setTagExpand] = useState(false)
  const toggleTag = () => setTagExpand(!tagExpand)
  const [, executeDelete] = useMutation(DELETE_JOB_TAG)

  const deleteTag = async () => {
    await executeDelete({
      job_id: jobId,
      tag: tag,
    })
  }

  return (
    <>
      {tagExpand ? (
        <span className='inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-indigo-500 hover:bg-indigo-700 text-white'>
          <span onClick={toggleTag}>{tag}</span>
          <button
            onClick={deleteTag}
            type='button'
            className='flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white'
          >
            <span className='sr-only'>Remove large option</span>
            <svg
              className='h-2 w-2'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 8 8'
            >
              <path
                strokeLinecap='round'
                strokeWidth='1.5'
                d='M1 1l6 6m0-6L1 7'
              />
            </svg>
          </button>
        </span>
      ) : (
        <button
          className='bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-0.5 px-2.5 mr-1 rounded-full text-xs focus:outline-none'
          onClick={toggleTag}
        >
          {tag}
        </button>
      )}
    </>
  )
}
