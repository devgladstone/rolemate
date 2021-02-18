import { Link, useRouteMatch } from 'react-router-dom'
import TagBlock from 'component/JobRoutes/JobMain/TagBlock'
import StatusBadge from './StatusBadge'

export default function JobGrid({
  id,
  title,
  company,
  description,
  location,
  status,
  tags,
}) {
  const { url } = useRouteMatch()

  const statuses = {
    DRAFT: { color: 'gray', text: 'DRAFT' },
    APPLIED: { color: 'yellow', text: 'APPLIED' },
    INTERVIEW: { color: 'green', text: 'INTERVIEW' },
    OFFER: { color: 'supergreen', text: 'OFFER' },
    REJECTED: { color: 'red', text: 'REJECTED' },
  }

  return (
    <li className='col-span-1 h-auto bg-white sm:rounded-lg shadow hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500'>
      <Link to={`${url}/${id}`}>
        <div className='w-full flex items-center px-3 pt-3'>
          <div className='flex-1 truncate'>
            <div className='flex items-center space-x-3 justify-between'>
              <h3 className='text-gray-900 text-sm font-medium truncate'>
                {title}
              </h3>
              <StatusBadge {...statuses[status]} />
            </div>
            <div className='flex items-center space-x-3 justify-between'>
              <p className='mt-1 text-gray-700 text-sm truncate'>{company}</p>
              <p className='mt-1 pr-0.5 text-gray-700 text-sm truncate'>
                {location}
              </p>
            </div>
            <p className='mt-2 text-gray-500 text-sm truncate'>{description}</p>
          </div>
        </div>
        <div className='pb-2 px-2 flex-wrap'>
          <TagBlock grid jobId={id} jobTags={tags} />
        </div>
      </Link>
    </li>
  )
}
