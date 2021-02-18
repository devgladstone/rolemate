import { useState, useEffect, useRef } from 'react'
import ReactEmbedGist from 'react-embed-gist'
import { useMutation } from 'urql'
import { UPDATE_GIST, DELETE_GIST } from 'graphqlAPI'

export default function GistList({ gist, jobId }) {
  const { id, description, url } = gist

  const [, executeUpdate] = useMutation(UPDATE_GIST)
  const [, executeDelete] = useMutation(DELETE_GIST)

  const [isEditing, setEditing] = useState(false)
  const [isViewing, setViewing] = useState(false)
  const [input, setInput] = useState(description)
  const inputRef = useRef()

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const onChange = ({ target }) => setInput(target.value)

  const toggleView = () => {
    setViewing(!isViewing)
  }

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
    <>
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
              d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
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
          <button
            className='font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out focus:outline-none'
            onClick={!isEditing ? toggleView : onSubmit}
            type={!isEditing ? undefined : 'submit'}
            form={!isEditing ? undefined : 'myform'}
          >
            {!isEditing ? (!isViewing ? 'View' : 'Close') : 'Save'}
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
      {isViewing && (
        <li className='p-1'>
          <ReactEmbedGist
            gist={url}
            wrapperClass='gist__bash'
            loadingClass='loading__screen'
            titleClass='gist__title'
          />
        </li>
      )}
    </>
  )
}
