import { useState } from 'react'
import { VERIFY_API } from 'config'
import { useUser } from 'context/UserContext'
import axios from 'axios'
import ExclaimSVG from 'component/Utility/ExclaimSVG'
import Loading from 'component/Utility/Loading'

export default function VerifyModal({ setModal }) {
  const { user } = useUser()
  const [isResending, setResending] = useState(false)
  const [hasError, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const onResend = async () => {
    setLoading(true)
    setError(false)
    try {
      await axios.post(VERIFY_API + '/resend', { email: user.email })
      setResending(true)
      setLoading(false)
    } catch (err) {
      setError(true)
      setResending(true)
      setLoading(false)
    }
  }

  const outputTitle = () => {
    if (isResending) {
      if (hasError) {
        return 'Error sending. Please try again later.'
      } else {
        return 'Email sent! Click on the new link provided to continue.'
      }
    } else {
      return 'Please verify your email first to continue.'
    }
  }

  return (
    <div className='fixed z-10 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div
          className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div>
                <div className='mx-auto flex items-center justify-center'>
                  <ExclaimSVG />
                </div>
                <div className='mt-3 text-center sm:mt-5'>
                  <h3
                    className='text-lg leading-6 font-medium text-gray-900'
                    id='modal-headline'
                  >
                    {outputTitle()}
                  </h3>
                  {!isResending && (
                    <button
                      onClick={onResend}
                      type='button'
                      className='underline text-md font-semibold text-indigo-700 hover:text-indigo-500 focus:outline-none focus:text-indigo-500'
                    >
                      Click here to resend email.
                    </button>
                  )}
                </div>
              </div>
              <div className='mt-5 sm:mt-6'>
                <button
                  onClick={() => setModal(false)}
                  type='button'
                  className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                >
                  Okay
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
