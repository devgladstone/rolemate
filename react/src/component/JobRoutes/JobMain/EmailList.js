import { useState, useEffect, useRef } from 'react'
import { useMutation } from 'urql'
import { UPDATE_EMAIL, DELETE_EMAIL } from 'graphqlAPI'

export default function EmailList({ email, jobId }) {
  const { id, description, url } = email

  const [, executeUpdate] = useMutation(UPDATE_EMAIL)
  const [, executeDelete] = useMutation(DELETE_EMAIL)

  const [isEditing, setEditing] = useState(false)
  const [input, setInput] = useState(description)
  const inputRef = useRef()

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const onChange = ({ target }) => setInput(target.value)

  const onEdit = () => {
    setEditing(true)
  }

  const onCancel = () => {
    setEditing(false)
    setInput(description)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await executeUpdate({
      id,
      description: input,
      job_id: jobId,
      updated_at: new Date().toISOString(),
    })
    setEditing(false)
  }

  const onDelete = async () => {
    await executeDelete({
      id,
      job_id: jobId,
      updated_at: new Date().toISOString(),
    })
    setEditing(false)
  }

  return (
    <li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5'>
      <div className='w-0 flex-1 flex items-center'>
        <svg
          className='flex-shrink-0 h-5 w-5 text-gray-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
          />
        </svg>
        <span className='ml-2 flex-1 -my-2 truncate'>
          {!isEditing ? (
            <>{description}</>
          ) : (
            <form id='myform' onSubmit={onSubmit}>
              <input
                required
                onChange={onChange}
                type='text'
                value={input}
                placeholder={input}
                className='border rounded p-1 text-sm w-full'
                ref={inputRef}
              />
            </form>
          )}
        </span>
      </div>
      <div className='ml-4 flex-shrink-0'>
        {!isEditing ? (
          <a
            className='font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out'
            target='_blank'
            rel='noreferrer'
            href={url}
          >
            View
          </a>
        ) : (
          <button
            type='submit'
            form='myform'
            className='font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out'
          >
            Save
          </button>
        )}
      </div>
      <div className='ml-4 flex-shrink-0'>
        <button
          onClick={!isEditing ? onEdit : onDelete}
          className={`font-medium transition duration-150 ease-in-out focus:outline-none ${
            !isEditing
              ? 'hover:text-indigo-500 text-indigo-600'
              : 'hover:text-red-500 text-red-600'
          }`}
        >
          {!isEditing ? 'Edit' : 'Delete'}
        </button>
      </div>
      {isEditing && (
        <div className='ml-4 flex-shrink-0'>
          <button
            onClick={onCancel}
            className='font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out focus:outline-none'
          >
            Cancel
          </button>
        </div>
      )}
    </li>
  )
}
