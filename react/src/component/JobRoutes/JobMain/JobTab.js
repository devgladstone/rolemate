import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DeleteModal from './DeleteModal'
import TagBlock from './TagBlock'
import StatusBlock from './StatusBlock'
import { useMutation } from 'urql'
import { UPDATE_JOB_POST, DELETE_JOB_POST } from 'graphqlAPI'

export default function JobTab({
  jobId,
  title,
  company,
  description,
  location,
  url,
  status,
  jobTags,
  userTags,
}) {
  const [job, setJob] = useState({
    title: title,
    company: company,
    description: description,
    location: location,
    url: url,
  })
  const [isEditing, setEdit] = useState(false)
  const [isDeleting, setDeleting] = useState(false)
  const inputRef = useRef()
  const history = useHistory()
  const [, executeUpdate] = useMutation(UPDATE_JOB_POST)
  const [, executeDelete] = useMutation(DELETE_JOB_POST)

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const onChange = ({ target }) => {
    setJob({
      ...job,
      [target.name]: target.value,
    })
  }

  const onCancel = () => {
    setJob({
      title,
      company,
      description,
      location,
      url,
    })
    setEdit(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await executeUpdate({
      id: jobId,
      input: {
        ...job,
        updated_at: new Date().toISOString(),
      },
    })
    setEdit(false)
  }

  const onDelete = async () => {
    await executeDelete({ id: jobId })
    history.push('/jobs')
  }

  return (
    <>
      <div className='mb-2 flex justify-between'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>
          Job Post
        </h2>
        <div>
          <div className='items-center flex-row'>
            <button
              onClick={() => {
                setEdit(!isEditing)
              }}
              type='button'
              className='mr-2 inline-flex items-center font-medium text-gray-500 hover:text-gray-800 bg-white hover:text-gray-50 focus:outline-none'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                />
              </svg>
            </button>
            <button
              onClick={() => setDeleting(true)}
              type='button'
              className='inline-flex items-center font-medium text-red-500 hover:text-gray-800 bg-white hover:text-gray-50 focus:outline-none'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <form onSubmit={onSubmit} className=''>
        <dl className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
          <div className='sm:col-span-1'>
            <dt className='text-sm leading-5 font-medium text-gray-800'>
              Title
            </dt>
            {!isEditing ? (
              <dd className='mt-1 text-sm text-gray-900'>{title}</dd>
            ) : (
              <div className='mt-1'>
                <input
                  ref={inputRef}
                  required
                  onChange={onChange}
                  value={job.title}
                  type='text'
                  name='title'
                  id='title'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            )}
          </div>
          <div className='sm:col-span-1'>
            <dt className='text-sm leading-5 font-medium text-gray-800'>
              Company
            </dt>
            {!isEditing ? (
              <dd className='mt-1 text-sm text-gray-900'>{company}</dd>
            ) : (
              <div className='mt-1'>
                <input
                  onChange={onChange}
                  value={job.company}
                  type='text'
                  name='company'
                  id='company'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            )}
          </div>
          <div className='sm:col-span-1'>
            <dt className='text-sm leading-5 font-medium text-gray-800'>
              Location
            </dt>
            {!isEditing ? (
              <dd className='mt-1 text-sm text-gray-900'>{location}</dd>
            ) : (
              <div className='mt-1'>
                <input
                  onChange={onChange}
                  value={job.location}
                  type='text'
                  name='location'
                  id='location'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            )}
          </div>
          <div className='sm:col-span-1'>
            <dt className='text-sm leading-5 font-medium text-gray-800'>Url</dt>
            {!isEditing ? (
              <dd className='truncate'>
                <a
                  href={url}
                  target='_blank'
                  rel='noreferrer'
                  className='cursor-pointer mt-1 underline text-sm text-indigo-600 hover:text-indigo-500'
                >
                  {url}
                </a>
              </dd>
            ) : (
              <div className='mt-1'>
                <input
                  onChange={onChange}
                  value={job.url}
                  type='url'
                  name='url'
                  id='url'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                />
              </div>
            )}
          </div>
          <div className='sm:col-span-2'>
            <dt className='text-sm leading-5 font-medium text-gray-800'>
              Description
            </dt>
            {!isEditing ? (
              <dd className='mt-1 text-sm text-gray-900'>{description}</dd>
            ) : (
              <div className='mt-1'>
                <textarea
                  rows='8'
                  required
                  onChange={onChange}
                  value={job.description}
                  type='text'
                  name='description'
                  id='description'
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                />
                <div className='flex justify-end mt-2'>
                  <button
                    type='button'
                    className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none'
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className='sm:col-span-1'>
            <StatusBlock jobId={jobId} status={status} />
          </div>
          <div className='sm:col-span-1'>
            <TagBlock jobId={jobId} jobTags={jobTags} userTags={userTags} />
          </div>
        </dl>
        {isDeleting && (
          <DeleteModal setDeleting={setDeleting} onDelete={onDelete} />
        )}
      </form>
    </>
  )
}
