import { Link, useRouteMatch, useLocation } from 'react-router-dom'

export default function JobHeader() {
  const { pathname } = useLocation()
  const { url } = useRouteMatch()
  return (
    <div className='flex flex-row'>
      <Link
        to={url}
        className={
          pathname === url
            ? 'py-1 text-sm font-medium text-gray-900 px-2 border-t border-l border-r border-gray-300 rounded-t-lg inline-flex items-center'
            : 'py-1 text-sm text-gray-500 px-2 border-b border-gray-300 inline-flex items-center hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'
        }
      >
        <svg
          className='hidden md:block mr-1 w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
          />
        </svg>
        Job Post
      </Link>
      <Link
        to={`${url}/resume`}
        className={
          pathname === `${url}/resume`
            ? 'py-1 text-sm font-medium text-gray-900 px-2 border-t border-l border-r border-gray-300 rounded-t-lg inline-flex items-center'
            : 'py-1 text-sm text-gray-500 px-2 border-b border-gray-300 inline-flex items-center hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'
        }
      >
        <svg
          className='hidden md:block mr-1 w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z'
          />
        </svg>
        Resume
      </Link>
      <Link
        to={`${url}/email`}
        className={
          pathname === `${url}/email`
            ? 'py-1 text-sm font-medium text-gray-900 px-2.5 border-t border-l border-r border-gray-300 rounded-t-lg inline-flex items-center'
            : 'py-1 text-sm text-gray-500 px-2.5 border-b border-gray-300 inline-flex items-center hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'
        }
      >
        <svg
          className='hidden md:block mr-1 w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
        Email
      </Link>
      <Link
        to={`${url}/code`}
        className={
          pathname === `${url}/code`
            ? 'py-1 text-sm font-medium text-gray-900 px-2.5 border-t border-l border-r border-gray-300 rounded-t-lg inline-flex items-center'
            : 'py-1 text-sm text-gray-500 px-2.5 border-b border-gray-300 inline-flex items-center hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300'
        }
      >
        <svg
          className='hidden md:block mr-1 w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
        Code
      </Link>
      <div className='flex-1 border-b border-gray-300'></div>
    </div>
  )
}
