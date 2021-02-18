import { useState } from 'react'
import { useQuery } from 'urql'
import { useUser } from 'context/UserContext'
import { GET_ALL_JOB_POSTS } from 'graphqlAPI'
import JobGrid from './JobGrid'
import ButtonRow from './ButtonRow'
import JobFilterRow from './JobFilterRow'
import Loading from 'component/Utility/Loading'

export default function Main() {
  const { user } = useUser()
  const [filter, setFilter] = useState('')
  const [tagsFilter, setTags] = useState([])
  const [statusFilter, setStatus] = useState('')

  const [result] = useQuery({
    query: GET_ALL_JOB_POSTS,
    variables: {
      user_id: user?.id,
    },
  })

  let { data, fetching, error } = result

  if (fetching || !data) return <Loading />
  if (error) return <h1>{error.message}</h1>

  return (
    <div className='space-y-10'>
      <ButtonRow
        isVerified={user.is_verified}
        userTags={data.user_by_pk.tags}
        tagsFilter={tagsFilter}
        setTags={setTags}
        statusFilter={statusFilter}
        setStatus={setStatus}
      />
      <JobFilterRow filter={filter} setFilter={setFilter} />
      <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {data.job_post
          .filter((job) => {
            function escapeRegExp(string) {
              return string.replace(/([.*+?^${}()|[\]\\])/g, '\\$1')
            }
            const regexFilter = new RegExp(escapeRegExp(filter), 'i')
            return (
              filter === '' ||
              job.title.search(regexFilter) > -1 ||
              job.company.search(regexFilter) > -1 ||
              job.description.search(regexFilter) > -1 ||
              job.location.search(regexFilter) > -1 ||
              job.tags.join(' ').search(regexFilter) > -1 ||
              job.status.search(regexFilter) > -1
            )
          })
          .filter((job) => statusFilter === '' || job.status === statusFilter)
          .filter(
            (job) =>
              tagsFilter.length === 0 ||
              tagsFilter.every((tag) => job.tags.includes(tag))
          )
          .map((job) => (
            <JobGrid key={job.id} {...job} />
          ))}
      </ul>
    </div>
  )
}
