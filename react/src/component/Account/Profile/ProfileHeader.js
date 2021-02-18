import { Link, useLocation, useRouteMatch } from 'react-router-dom'

export default function ProfileHeader() {
  const { pathname } = useLocation()
  const { url } = useRouteMatch()

  return (
    <div className='pb-4'>
      <div className=''>
        <div className='border-b border-gray-200'>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            <Link
              to={url}
              className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm 
                                ${
                                  pathname === url
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                            `}
            >
              <svg
                className='-ml-0.5 mr-2 h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                />
              </svg>
              <span>Account</span>
            </Link>
            <Link
              to={`${url}/tags`}
              className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm 
                            ${
                              pathname === `${url}/tags`
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }
                        `}
            >
              <svg
                className='-ml-0.5 mr-2 h-5 w-5'
                fill='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                ></path>
              </svg>
              <span>Tags</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
