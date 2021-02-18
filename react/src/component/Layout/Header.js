import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from 'context/UserContext'
import LogoSVG from 'component/Utility/LogoSVG'

export default function Header() {
  const { isFetching, user, logout, isAuthenticated } = useUser()
  const { pathname } = useLocation()
  const [dropdown, setDropdown] = useState(false)

  useEffect(() => {
    setDropdown(false)
  }, [pathname])

  return (
    <>
      <nav className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <Link to='/home' className='flex-shrink-0 flex items-center'>
                <LogoSVG />
                <span className='antialiased ml-1 text-gray-900 text-2xl font-bold tracking-wide'>
                  RoleMate
                </span>
              </Link>
              <div className='ml-6 flex'>
                {isAuthenticated && (
                  <Link
                    to='/jobs'
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out
                                    ${
                                      pathname.includes('jobs')
                                        ? 'border-indigo-500 text-gray-900 focus:outline-none focus:border-indigo-700 '
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 '
                                    }
                                    `}
                  >
                    Jobs
                  </Link>
                )}
              </div>
            </div>
            <div
              className={`ml-6 flex items-center 
              ${isFetching ? 'animate-pulse' : ''}`.trim()}
            >
              {!isAuthenticated ? (
                <Link
                  to='/login'
                  className='py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 hover:text-white focus:outline-none focus:border-indigo-700 focus:ring-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
                >
                  Login
                </Link>
              ) : (
                <div className='relative'>
                  <div>
                    <button
                      onClick={() => setDropdown(!dropdown)}
                      className='relative z-20 py-2 px-4 text-sm text-white font-medium border border-transparent bg-indigo-600 rounded-md focus:outline-none focus:border-indigo-300'
                      id='user-menu'
                      aria-label='User menu'
                      aria-haspopup='true'
                    >
                      {user.email.split('@')[0]}
                    </button>
                  </div>
                  {dropdown && (
                    <>
                      <button
                        onClick={() => setDropdown(false)}
                        tabIndex='-1'
                        className='fixed z-10 inset-0 bg-black opacity-50 h-full w-full cursor-default'
                      ></button>
                      <div className='origin-top-right z-20 absolute right-0 mt-2 w-48 rounded-md shadow-lg'>
                        <div
                          className='py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5'
                          role='menu'
                          aria-orientation='vertical'
                          aria-labelledby='user-menu'
                        >
                          <Link
                            to='/profile'
                            className='block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'
                            role='menuitem'
                          >
                            Your Profile
                          </Link>
                          <div
                            onClick={logout}
                            className='block px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'
                            role='menuitem'
                          >
                            Sign out
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
