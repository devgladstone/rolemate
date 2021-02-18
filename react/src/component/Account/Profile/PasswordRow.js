import { useState, useEffect, useRef } from 'react'
import { AUTH_API } from 'config'
import axios from 'axios'
import GenericModal from 'component/Utility/GenericModal'
import CheckSVG from 'component/Utility/CheckSVG'
import ErrorSVG from 'component/Utility/ErrorSVG'

export default function PasswordRow({ email }) {
  const inputRef = useRef()
  const [state, setState] = useState({
    currentPassword: '',
    newPassword: '',
  })
  const [isEditing, setEditing] = useState(false)
  const [modal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const onChange = ({ target }) =>
    setState({
      ...state,
      [target.name]: target.value,
    })

  const toggleEdit = () => setEditing(!isEditing)

  const cancelEdit = () => {
    setState({
      currentPassword: '',
      newPassword: '',
    })
    setEditing(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setModal(true)
    try {
      await axios.put(AUTH_API + '/password', {
        email,
        password: state.currentPassword,
        newPassword: state.newPassword,
      })
      setErrorMsg('')
      setEditing(false)
      setLoading(false)
      setState('')
    } catch ({ response }) {
      if (response.status === 400 || response.status === 401) {
        if (response.data.message === "Invalid 'username' or 'password'") {
          setErrorMsg('Oops! Wrong password.')
          setLoading(false)
          setState('')
        } else {
          setErrorMsg('Error updating. Please try again later.')
          setLoading(false)
          setState('')
        }
      }
    }
  }

  return (
    <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
      {modal && (
        <GenericModal
          ImgSVG={errorMsg !== '' ? ErrorSVG : CheckSVG}
          title={errorMsg !== '' ? errorMsg : 'Password updated!'}
          subtext={errorMsg !== '' ? 'Try a different password' : 'Continue'}
          isLoading={isLoading}
          setModal={setModal}
        />
      )}
      <dt className='text-sm font-medium text-gray-500'>Password</dt>
      <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
        {isEditing ? (
          <span className='flex-grow'>
            <form onSubmit={onSubmit} className='space-x-2 sm:w-4/6'>
              <div className='flex-col space-y-2'>
                <label
                  className='text-sm font-medium text-gray-800'
                  htmlFor='currentPassword'
                >
                  Current Password
                </label>
                <div className='pb-4'>
                  <input
                    ref={inputRef}
                    type='password'
                    required
                    onChange={onChange}
                    value={state.currentPassword}
                    name='currentPassword'
                    id='currentPassword'
                    className='w-full block px-2 py-2 text-left shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md'
                  />
                </div>
                <label
                  className='text-sm font-medium text-gray-800'
                  htmlFor='newPassword'
                >
                  New Password
                </label>
                <div className='my-4'>
                  <input
                    type='password'
                    required
                    onChange={onChange}
                    value={state.newPassword}
                    name='newPassword'
                    id='newPassword'
                    minLength='8'
                    className='w-full block px-2 py-2 text-left shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='flex justify-end mt-2'>
                <button
                  type='submit'
                  className='px-4 py-2 border rounded bg-indigo-500 hover:bg-indigo-700 font-medium text-white'
                >
                  Submit
                </button>
              </div>
            </form>
          </span>
        ) : (
          <span className='flex-grow'>*******************</span>
        )}

        <span className='ml-4 flex-shrink-0'>
          <button
            onClick={isEditing ? cancelEdit : toggleEdit}
            type='button'
            className='bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none'
          >
            {isEditing ? 'Cancel' : 'Update'}
          </button>
        </span>
      </dd>
    </div>
  )
}
