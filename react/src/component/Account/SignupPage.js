import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from 'context/UserContext'
import GenericModal from 'component/Utility/GenericModal'
import ErrorSVG from 'component/Utility/ErrorSVG'

const SignupPage = () => {
  const { signup } = useUser()
  const history = useHistory()
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const [modal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const onChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    })
  }

  const onSubmit = async (e) => {
    setLoading(true)
    setModal(true)
    e.preventDefault()

    const { ok, error } = await signup(state)
    if (ok) {
      history.push({
        pathname: '/profile',
        state: { newUser: true },
      })
    }
    if (error) {
      if (error === 429) {
        setErrorMsg('Too many attempts. Please try again in an hour.')
      } else if (error === 409) {
        setErrorMsg('Email already exists. Please try a different email.')
      } else {
        setErrorMsg('Error signing up. Please try again later.')
      }
      setLoading(false)
    }
  }

  return (
    <>
      {modal && (
        <GenericModal
          ImgSVG={ErrorSVG}
          title={errorMsg}
          subtext={'Okay'}
          isLoading={isLoading}
          setModal={setModal}
        />
      )}
      <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 sm:rounded'>
        <div className='max-w-md w-full'>
          <div className='flex-col justify-center'>
            <h2 className='text-center text-3xl leading-9 font-extrabold text-gray-900'>
              Sign up for an account
            </h2>
            <Link
              to='/login'
              className='block text-center mt-2 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
            >
              Or click here to login.
            </Link>
          </div>
          <form onSubmit={onSubmit} className='mt-5'>
            <input type='hidden' name='remember' value='true' />
            <div className='rounded-md shadow-sm'>
              <div>
                <input
                  value={state.email}
                  onChange={onChange}
                  aria-label='Email address'
                  name='email'
                  type='email'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                  placeholder='Email address'
                />
              </div>
              <div className='-mt-px'>
                <input
                  value={state.password}
                  onChange={onChange}
                  aria-label='Password'
                  name='password'
                  type='password'
                  required
                  minLength='8'
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5'
                  placeholder='Password'
                />
              </div>
            </div>

            <div className='mt-6'>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <svg
                    className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignupPage
