import { useState, useEffect, useRef } from 'react'
import { useUser } from 'context/UserContext'
import { useMutation } from 'urql'
import { CREATE_JOB_TAG, CREATE_TAG } from 'graphqlAPI'

export default function TagDropdown({ jobId, userTags, jobTags }) {
  const { user } = useUser()
  const [tagDropdown, setTagDropdown] = useState(false)
  const [tagInput, setTag] = useState('')
  const [, executeCreateJobTag] = useMutation(CREATE_JOB_TAG)
  const [, executeCreateTag] = useMutation(CREATE_TAG)
  const inputRef = useRef()
  const onChange = ({ target }) => setTag(target.value.toLowerCase())

  useEffect(() => {
    if (tagDropdown) {
      inputRef.current.focus()
    }
  }, [tagDropdown])

  function handleTransition() {
    setTagDropdown(false)
    setTag('')
    inputRef.current.focus()
  }

  const createJobTag = async (e) => {
    await executeCreateJobTag({
      tag: e.target.value,
      job_id: jobId,
      time: new Date().toISOString(),
    })
    setTagDropdown(false)
    setTag('')
  }

  const createTag = async (e) => {
    const tag = e.target.value
    const newTags = userTags.concat(tag)

    await executeCreateTag({
      tag,
      tags: '{' + newTags.join(',') + '}',
      user_id: user.id,
      job_id: jobId,
      time: new Date().toISOString(),
    })
    setTagDropdown(false)
    setTag('')
  }

  return (
    <div className='relative inline-block text-left'>
      <div>
        <span className='rounded-md shadow-sm'>
          <button
            onClick={() => setTagDropdown(!tagDropdown)}
            type='button'
            className='inline-flex justify-center w-full rounded-full py-0.5 px-2.5 text-white font-medium bg-red-500 text-xs leading-5 hover:bg-red-700 focus:outline-none focus:border-red-300 focus:ring-red'
            id='options-menu'
            aria-haspopup='true'
            aria-expanded='true'
          >
            Add tag
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

      {tagDropdown && (
        <>
          <button
            onClick={handleTransition}
            tabIndex='-1'
            className='fixed inset-0 h-full w-full cursor-default'
          ></button>

          <div
            className={`z-10 origin-top-right absolute left-0 mt-2 rounded-md shadow-lg ${
              tagInput === '' ? 'w-72' : 'w-48'
            }`}
          >
            <div className='rounded-md bg-white ring-1 ring-black ring-opacity-5'>
              <div
                className='py-1'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                <input
                  onChange={onChange}
                  value={tagInput}
                  type='text'
                  ref={inputRef}
                  placeholder='Enter tag name...'
                  className='w-full block border-white px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none'
                />
                <div
                  className={
                    tagInput === '' && 'grid grid-cols-3 divide-x divide-x-200'
                  }
                >
                  {userTags
                    .filter((tag) => !jobTags.includes(tag))
                    .map((tag, i) => (
                      <button
                        key={i}
                        value={tag}
                        onClick={createJobTag}
                        className={
                          tagInput === '' ||
                          tag.search(
                            tagInput.replace(/([.*+?^${}()|[\]\\])/g, '\\$1')
                          ) > -1
                            ? 'w-full block truncate overflow-clip px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
                            : 'hidden w-full block truncate overflow-clip px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
                        }
                        role='menuitem'
                      >
                        {tag}
                      </button>
                    ))}
                </div>
                {tagInput !== '' && !userTags.includes(tagInput) && (
                  <button
                    value={tagInput}
                    onClick={createTag}
                    className='w-full block overflow-y-auto px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900'
                    role='menuitem'
                  >
                    Create new tag {`"${tagInput}"`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
