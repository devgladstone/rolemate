import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className='px-5 py-10 overflow-hidden lg:py-10'>
      <div className='relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl'>
        <div className='relative flex-col justify-center'>
          <h2 className='text-center text-2xl leading-6 font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
            Job searching made easier.
          </h2>
          <p className='my-2 max-w-3xl mx-auto text-center text-xl text-gray-500'>
            Organize all your job applications in one place.
          </p>
          <div className='mt-10 aspect-16x9 relative h-0'>
            <iframe
              title='RoleMate-DemoVideo'
              aria-hidden='true'
              className='absolute top-0 left-0 w-full h-full'
              src='https://www.youtube.com/embed/NQVdjCtzSIQ'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className='mt-12 flex justify-center space-x-6 lg:space-x-36'>
          <div className='flex-col justify-center'>
            <div className='flex justify-center text-red-600'>
              <svg
                className='w-8 h-8'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
            <div className='flex justify-center'>
              <h3 className='w-28 tracking-tight text-center text-md font-medium'>
                Attach emails, resumes and code snippets
              </h3>
            </div>
          </div>
          <div className='flex-col justify-center'>
            <div className='flex justify-center text-blue-600'>
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                />
              </svg>
            </div>
            <div className='flex justify-center'>
              <h3 className='w-28 tracking-tight text-center text-md font-medium'>
                Organize and filter with tags and statuses
              </h3>
            </div>
          </div>
          <div className='flex-col justify-center'>
            <div className='flex justify-center text-indigo-600'>
              <svg
                className='w-8 h-8'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div className='flex justify-center'>
              <h3 className='w-28 tracking-tight text-center text-md font-medium'>
                Keep track of job updates with timelines
              </h3>
            </div>
          </div>
        </div>

        <div className='mt-8 bg-gray-50 rounded-lg shadow-md text-center py-12 px-4 sm:px-6'>
          <h2 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
            <span className='leading-8 block'>Free to use.</span>
            <span className='block'>Create an account to start.</span>
          </h2>
          <div className='mt-6 flex justify-center'>
            <div className='inline-flex rounded-md shadow'>
              <Link
                to='/signup'
                className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
              >
                Sign up
              </Link>
            </div>
            <div className='ml-3 inline-flex'>
              <Link
                to='/login'
                className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
