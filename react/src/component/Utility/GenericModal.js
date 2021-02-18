import Loading from 'component/Utility/Loading'

export default function GenericModal({
  ImgSVG,
  title,
  subtext,
  isLoading,
  setModal,
}) {
  return (
    <div className='fixed z-20 inset-0 overflow-y-auto'>
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
                  <ImgSVG />
                </div>
                <div className='mt-3 text-center sm:mt-5'>
                  <h3
                    className='text-lg leading-6 font-medium text-gray-900'
                    id='modal-headline'
                  >
                    {title}
                  </h3>
                </div>
              </div>
              <div className='mt-5 sm:mt-6'>
                <button
                  onClick={() => setModal(false)}
                  className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                >
                  {subtext}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
