export default function PDFOverlay({ url, cancelView }) {
  return (
    <>
      <div className='fixed z-10 inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen min-w-full pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
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
            className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:p-6'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'
          >
            <div className='absolute top-0 right-0 pt-4 pr-4'>
              <button
                onClick={cancelView}
                type='button'
                className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                <span className='sr-only'>Close</span>
                <svg
                  className='h-6 w-6'
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div className='my-1'>
              <iframe
                title='resume-pdf'
                aria-hidden='true'
                className=''
                width='510'
                height='660'
                frameBorder='0'
                src={`${url}#view=Fit`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
