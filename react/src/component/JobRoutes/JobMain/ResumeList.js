import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useMutation } from 'urql'
import { FILE_API } from 'config'
import { UPDATE_RESUME, DELETE_RESUME } from 'graphqlAPI'

export default function ResumeList({ resume, setViewing, setUrl }) {
  const { id, url, filename, s3_key: key } = resume
  const [, executeUpdate] = useMutation(UPDATE_RESUME)
  const [, executeDelete] = useMutation(DELETE_RESUME)
  const inputRef = useRef()

  const [isEditing, setEditing] = useState(false)
  const [input, setInput] = useState(filename)

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const onView = () => {
    setViewing(true)
    setUrl(url)
  }

  const onChange = ({ target }) => setInput(target.value)

  const onEdit = () => {
    setEditing(true)
  }

  const onCancel = () => {
    setEditing(false)
    setInput(filename)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await executeUpdate({
      id,
      input,
    })
    setEditing(false)
  }

  const onDelete = async () => {
    await Promise.all([
      executeDelete({ id }),
      axios.post(FILE_API + '/delete', { key }),
    ])
    setEditing(false)
  }

  return (
    <li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm'>
      <div className='w-0 flex-1 flex items-center'>
        <svg
          className='flex-shrink-0 h-5 w-5 text-gray-400'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
            clipRule='evenodd'
          />
        </svg>
        <span className='ml-2 flex-1 -my-2 truncate'>
          {!isEditing ? (
            <>{filename}</>
          ) : (
            <form id='myform' onSubmit={onSubmit}>
              <input
                required
                onChange={onChange}
                type='text'
                value={input}
                placeholder={input}
                className='border rounded p-1 text-sm w-full focus:ring-2'
                ref={inputRef}
              />
            </form>
          )}
        </span>
      </div>
      <div className='ml-4 flex-shrink-0'>
        <button
          onClick={!isEditing ? onView : onSubmit}
          type={isEditing ? 'submit' : undefined}
          form={isEditing ? 'myform' : undefined}
          className='font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out focus:outline-none'
        >
          {!isEditing ? 'View' : 'Save'}
        </button>
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
