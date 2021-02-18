import { useState } from 'react'
import { useMutation } from 'urql'
import { request } from '@octokit/request'
import { CREATE_GIST } from 'graphqlAPI'

export default function GistCreate({ setCreating, jobId, isGistsEmpty }) {
  const [input, setInput] = useState('')
  const [, executeCreate] = useMutation(CREATE_GIST)

  const onChange = ({ target }) => setInput(target.value)

  const onCancel = () => {
    setInput('')
    setCreating(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const owner = input.split('/')[3]
    let id = input.split('/')[4]
    id = id.split('#')[0]
    const url = `${owner}/${id}`
    const { data } = await request(`GET /gists/${id}`)
    const { description } = data
    await executeCreate({
      object: {
        url,
        description,
        job_id: jobId,
      },
      job_id: jobId,
      updated_at: new Date().toISOString(),
    })
    setCreating(false)
  }

  return (
    <form className='mt-2' onSubmit={onSubmit}>
      <div>
        <label htmlFor='gistUrl' className='sr-only'>
          gistUrl
        </label>
        <p className='mb-2 text-sm text-gray-800' id='tag-description'>
          {'Enter a gist url to save code snippets. You can create one at '}
          <a
            className='underline text-blue-600'
            href='https://gist.github.com/'
            target='_blank'
            rel='noreferrer'
          >
            https://gist.github.com/
          </a>
        </p>
        <input
          required
          type='url'
          onChange={onChange}
          value={input}
          id='gistUrl'
          className='my-2 px-2 py-2 text-left shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
          placeholder='https://gist.github.com/mygithub/id'
        />
      </div>
      <div className='flex justify-end pt-1'>
        {!isGistsEmpty && (
          <button
            onClick={onCancel}
            type='button'
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
          >
            Cancel
          </button>
        )}
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
