import { Link } from 'react-router-dom'
import Card from 'component/Layout/Card'

export default function PageNotFound() {
  return (
    <Card>
      <div>
        <h1 className='pb-4 text-2xl font-bold text-gray-900'>
          Page not found.
        </h1>
        <Link
          to={`/jobs`}
          className='text-indigo-700 font-medium underline hover:text-indigo-500'
        >
          Return to jobs
        </Link>
      </div>
    </Card>
  )
}
