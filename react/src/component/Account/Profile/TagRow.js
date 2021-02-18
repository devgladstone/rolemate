import { useState, useEffect, useRef } from 'react'
import { useMutation } from 'urql'
import { UPDATE_USER_TAG, DELETE_USER_TAG } from 'graphqlAPI'
import GenericModal from 'component/Utility/GenericModal'
import ErrorSVG from 'component/Utility/ErrorSVG'

export default function PasswordRow({ tag, tagFilter, userId, userTags }) {
  const inputRef = useRef()
  const [state, setState] = useState(tag)
  const [isEditing, setEditing] = useState(false)
  const [modal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [, executeUpdate] = useMutation(UPDATE_USER_TAG)
  const [, executeDelete] = useMutation(DELETE_USER_TAG)

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const onChange = ({ target }) => setState(target.value)

  const onCancel = () => {
    setState(tag)
    setEditing(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setModal(true)
    const newTags = userTags.slice()
    newTags[newTags.indexOf(tag)] = state
    try {
      await executeUpdate({
        user_id: userId,
        tags: '{' + newTags.join(',') + '}',
        search: tag,
        replace: state,
        delete: tag,
      })
      setEditing(false)
    } catch (err) {
      setErrorMsg('Error updating. Please try again later.')
    }
  }

  const onDelete = async (e) => {
    e.preventDefault()
    setLoading(true)
    setModal(true)
    setErrorMsg('')
    const index = userTags.indexOf(tag)
    const newTags = userTags.slice(0, index).concat(userTags.slice(index + 1))
    try {
      await executeDelete({
        user_id: userId,
        tags: '{' + newTags.join(',') + '}',
        search: state,
        delete: state,
      })
      setEditing(false)
    } catch (err) {
      setErrorMsg('Error deleting. Please try again later.')
    }
  }

  return tagFilter === '' ||
    tag.search(tagFilter.replace(/([.*+?^${}()|[\]\\])/g, '\\$1')) > -1 ? (
    <div className='py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:border-b sm:border-gray-200'>
      {modal && (
        <GenericModal
          ImgSVG={ErrorSVG}
          title={errorMsg}
          subtext={'Okay'}
          isLoading={isLoading}
          setModal={setModal}
        />
      )}
      <dd className='px-4 mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
        {isEditing ? (
          <span className='flex-grow'>
            <form onSubmit={onSubmit} className='space-x-2 sm:w-4/6'>
              <div className='flex-col space-y-2'>
                <div className='flex space-x-2'>
                  <input
                    ref={inputRef}
                    type='text'
                    required
                    onChange={onChange}
                    value={state}
                    name='newTag'
                    id='newTag'
                    className='w-full block px-2 py-2 text-left shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md'
                  />
                  <button
                    type='submit'
                    className='px-4 py-2 border rounded bg-indigo-500 hover:bg-indigo-700 font-medium text-white'
                  >
                    Submit
                  </button>
                  <button
                    onClick={onDelete}
                    className='px-4 py-2 border rounded bg-red-600 hover:bg-red-700 font-medium text-white'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </span>
        ) : (
          <span className='flex-grow'>{tag}</span>
        )}

        <span className='ml-4 flex-shrink-0'>
          <button
            onClick={isEditing ? onCancel : () => setEditing(!isEditing)}
            type='button'
            className='bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none'
          >
            {isEditing ? 'Cancel' : 'Update'}
          </button>
        </span>
      </dd>
    </div>
  ) : (
    <> </>
  )
}
