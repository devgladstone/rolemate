export default function JobPreview({
  title,
  company,
  description,
  location,
  url,
  onChange,
}) {
  return (
    <div className='mt-2 grid grid-cols-1 gap-4 sm:grid-cols-6'>
      <div className='sm:col-span-2'>
        <label htmlFor='title' className='text-sm font-medium text-gray-700'>
          Title*
        </label>
        <div className='mt-1'>
          <input
            required
            onChange={onChange}
            value={title}
            type='text'
            name='title'
            id='title'
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          />
        </div>
      </div>

      <div className='sm:col-span-2'>
        <label htmlFor='company' className='text-sm font-medium text-gray-700'>
          Company
        </label>
        <div className='mt-1'>
          <input
            onChange={onChange}
            value={company}
            type='text'
            name='company'
            id='company'
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          />
        </div>
      </div>

      <div className='sm:col-span-2'>
        <label htmlFor='location' className='text-sm font-medium text-gray-700'>
          Location
        </label>
        <div className='mt-1'>
          <input
            onChange={onChange}
            value={location}
            type='text'
            name='location'
            id='location'
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          />
        </div>
      </div>

      <div className='sm:col-span-6'>
        <label htmlFor='url' className='text-sm font-medium text-gray-700'>
          Url
        </label>
        <div className='mt-1'>
          <input
            onChange={onChange}
            value={url}
            type='url'
            name='url'
            id='url'
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          />
        </div>
      </div>

      <div className='sm:col-span-6'>
        <label
          htmlFor='description'
          className='text-sm font-medium text-gray-700'
        >
          Description
        </label>
        <div className='mt-1'>
          <textarea
            onChange={onChange}
            value={description}
            id='description'
            name='description'
            rows='8'
            className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          ></textarea>
        </div>
      </div>
    </div>
  )
}
