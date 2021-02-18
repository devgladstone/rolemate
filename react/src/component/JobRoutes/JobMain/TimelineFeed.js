export default function TimelineFeed({ timelines, createdAt }) {
  return (
    <section
      aria-labelledby='timeline-title'
      className='lg:col-start-3 lg:col-span-1'
    >
      <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6'>
        <h2 id='timeline-title' className='text-lg font-medium text-gray-900'>
          Timeline
        </h2>

        <div className='mt-6 flow-root'>
          <ul className='-mb-8'>
            {timelines
              .slice(0)
              .reverse()
              .map((timeline) => (
                <li key={timeline.id}>
                  <div className='relative pb-8'>
                    <span
                      className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200'
                      aria-hidden='true'
                    ></span>
                    <div className='relative flex space-x-3'>
                      <div>
                        {timeline.value === 'REJECTED' ? (
                          <span className='h-8 w-8 rounded-full bg-red-500 flex items-center justify-center ring-8 ring-white'>
                            <svg
                              className='h-5 w-5 text-white'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                              xmlns='http://www.w3.org/2000/svg'
                              aria-hidden='true'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                              />
                            </svg>
                          </span>
                        ) : (
                          <span className='h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white'>
                            <svg
                              className='h-5 w-5 text-white'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                fillRule='evenodd'
                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                      <div className='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                        <div>
                          <p className='text-sm text-gray-500'>
                            {`${timeline.property}: `}
                            <span className='font-medium text-gray-900'>
                              {timeline.value}
                            </span>
                          </p>
                        </div>
                        <div className='text-right text-sm whitespace-nowrap text-gray-500'>
                          <time dateTime={timeline.time}>
                            {new Date(timeline.time).toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}

            <li>
              <div className='relative pb-8'>
                <div className='relative flex space-x-3'>
                  <div>
                    <span className='h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white'>
                      <svg
                        className='h-5 w-5 text-white'
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
                    </span>
                  </div>
                  <div className='min-w-0 flex-1 pt-1.5 flex justify-between space-x-4'>
                    <div>
                      <p className='text-sm text-gray-500'>Job Post Created</p>
                    </div>
                    <div className='text-right text-sm whitespace-nowrap text-gray-500'>
                      <time dateTime={createdAt}>
                        {new Date(createdAt).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
