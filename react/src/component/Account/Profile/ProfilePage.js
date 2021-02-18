import { useUser } from 'context/UserContext'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import PasswordRow from './PasswordRow'
import GenericModal from 'component/Utility/GenericModal'
import CheckSVG from 'component/Utility/CheckSVG'

export default function ProfilePage() {
  const { user } = useUser()
  const history = useHistory()
  const newUser = history.location.state?.newUser || false
  const [modal, setModal] = useState(newUser)

  return (
    <>
      {modal && (
        <GenericModal
          ImgSVG={CheckSVG}
          title='Account created! Please verify your email using the link sent to your inbox.'
          subtext='Continue'
          setModal={setModal}
        />
      )}
      <div className='px-4 sm:px-6'>
        <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
          <div className='ml-4 mt-2 flex flex-row justify-center'>
            <h3 className='text-lg font-medium text-gray-900'>
              Account Information
            </h3>
          </div>
        </div>
        <dl className='divide-y divide-gray-200'>
          <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
            <dt className='text-sm font-medium text-gray-500'>Email</dt>
            <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              <span className='flex-grow'>{user.email}</span>
            </dd>
          </div>
          <PasswordRow email={user.email}></PasswordRow>
        </dl>
      </div>
    </>
  )
}
