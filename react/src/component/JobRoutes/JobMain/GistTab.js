import { useState } from 'react'
import GistList from './GistList'
import GistCreate from './GistCreate'

export default function GistTab({ jobId, gists }) {
  const [isCreating, setCreating] = useState(false)

  return (
    <>
      <div className='mb-2 flex justify-between'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>Code</h2>
        <div>
          {!isCreating && (
            <div className='flex lg:mt-0 lg:ml-4'>
              {gists.length !== 0 && (
                <span>
                  <button
                    onClick={() => setCreating(true)}
                    type='button'
                    className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none'
                  >
                    <svg
                      className='-ml-1 mr-2 h-5 w-5 text-gray-500'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                    </svg>
                    Save Gist
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <dl>
        <div className='text-sm leading-5 text-gray-800'>
          <div className='mb-4'>
            {isCreating && (
              <GistCreate setCreating={setCreating} jobId={jobId} />
            )}
            {gists.length === 0 && (
              <GistCreate
                setCreating={setCreating}
                jobId={jobId}
                isGistsEmpty
              />
            )}
          </div>
          <dd className='sm:col-span-3'>
            {gists.length > 0 && (
              <ul className='border border-gray-300 rounded-md divide-y divide-gray-200'>
                {gists
                  .slice(0)
                  .reverse()
                  .map((gist) => (
                    <GistList key={gist.id} gist={gist} jobId={jobId} />
                  ))}
              </ul>
            )}
          </dd>
        </div>
      </dl>
    </>
  )
}
