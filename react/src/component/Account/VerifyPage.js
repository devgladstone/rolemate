import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { VERIFY_API } from 'config'
import axios from 'axios'
import Card from 'component/Layout/Card'
import Loading from 'component/Utility/Loading'

export default function VerifyPage() {
  const { search } = useLocation()
  const [isLoading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isResending, setResending] = useState(false)
  const searchSplit = search.split(/[=&]/)
  const verificationCode = searchSplit[1]
  const email = searchSplit[3]

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.post(VERIFY_API + '/validate', {
          email,
          verificationCode,
        })
        setLoading(false)
        setSuccess(true)
      } catch ({ response }) {
        if (response.status === 400 || response.status === 401) {
          // catch all || 401: invalid email - no such user
          setErrorMsg(
            'Error validating. Please try the link in your email again.'
          )
        } else if (response.status === 410) {
          if (response.data.message === 'User already verified') {
            // already verified
            setErrorMsg("You're already verified!")
          } else {
            // code expired - use resend link
            setErrorMsg('Your code has expired.')
          }
        }
        setSuccess(false)
        setLoading(false)
      }
    }
    if (!email || !verificationCode) {
      setErrorMsg('Please use the verification link provided in your email.')
      setLoading(false)
      setSuccess(false)
    } else {
      verifyEmail()
    }
  }, [email, verificationCode])

  const onResend = async (e) => {
    e.preventDefault()
    await axios.post(VERIFY_API + '/resend', { email })
    setResending(true)
  }

  return (
    <Card>
      <div className='py-40 flex-col justify-center space-y-4'>
        {isLoading ? (
          <>
            <h2 className='text-center text-3xl leading-9 font-bold text-gray-900'>
              Verifying
            </h2>
            <Loading />
          </>
        ) : isResending ? (
          <div className='text-center leading-9 font-bold text-gray-900 space-y-8'>
            <h2 className='text-3xl'>Thanks {email}!</h2>
            <h2 className='text-2xl'>
              Please allow a few moments to receive your email.
            </h2>
            <h2 className='text-2xl'>
              Click on the new link provided to continue.
            </h2>
          </div>
        ) : (
          <>
            <h2 className='text-center text-3xl leading-9 font-extrabold text-gray-900'>
              {success ? 'Thanks!' : 'Oops!'}
            </h2>
            <h2 className='text-center text-2xl leading-9 font-bold text-gray-900'>
              {success ? 'Your email has been verified.' : errorMsg}
            </h2>
            {!success && errorMsg === 'Your code has expired.' && (
              <div className='flex justify-center'>
                <button
                  onClick={onResend}
                  className='underline text-2xl leading-9 font-bold text-indigo-700 hover:text-indigo-500 focus:outline-none focus:text-indigo-500'
                >
                  Please click here to resend the email.
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  )
}
