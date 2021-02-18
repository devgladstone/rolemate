import { useState } from 'react'
import { useMutation } from 'urql'
import { CREATE_EMAIL } from 'graphqlAPI'

export default function EmailCreate({ setCreating, jobId }) {
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [, executeCreate] = useMutation(CREATE_EMAIL)

  const onChangeUrl = ({ target }) => setUrl(target.value)
  const onChangeDescription = ({ target }) => setDescription(target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    await executeCreate({
      object: {
        url,
        description,
        job_id: jobId,
      },
      job_id: jobId,
      updated_at: new Date().toISOString(),
    })
    setUrl('')
    setDescription('')
    setCreating(false)
  }

  const onCancel = () => {
    setUrl('')
    setDescription('')
    setCreating(false)
  }

  return (
    <form onSubmit={onSubmit} className='mt-2'>
      <div className='sm:flex sm:space-x-4'>
        <div className='flex-col sm:flex-1'>
          <label htmlFor='url' className=''>
            Url
          </label>
          <input
            required
            type='url'
            onChange={onChangeUrl}
            value={url}
            id='url'
            className='my-1 px-2 py-2 text-left shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
            placeholder='https://mail.google.com/mail/u/0/#inbox/FMfctwwPjnbrQBwJZCxWXBqZgmBRwNGV'
          />
        </div>
        <div className='flex-col sm:flex-1'>
          <label htmlFor='description' className=''>
            Description
          </label>
          <input
            required
            type='text'
            onChange={onChangeDescription}
            value={description}
            id='description'
            className='my-1 px-2 py-2 text-left shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
            placeholder='Recruiting Manager Thread'
          />
        </div>
      </div>
      <div className='flex justify-end pt-2'>
        <button
          onClick={onCancel}
          type='button'
          className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none'
        >
          Save
        </button>
      </div>
    </form>
  )
}
