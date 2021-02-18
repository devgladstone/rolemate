import { Switch, Route, useParams, useRouteMatch } from 'react-router-dom'
import { useQuery } from 'urql'
import { useUser } from 'context/UserContext'
import { GET_JOB_POST_BY_ID } from 'graphqlAPI'
import { JobHeader } from 'component/Layout'
import Loading from 'component/Utility/Loading'
import PageNotFound from 'component/Utility/PageNotFound'
import TimelineFeed from './TimelineFeed'
import JobTab from './JobTab'
import ResumeTab from './ResumeTab'
import GistTab from './GistTab'
import EmailTab from './EmailTab'

function JobRoutes() {
  const { user } = useUser()
  const { path } = useRouteMatch()
  const { id } = useParams()

  const [result] = useQuery({
    query: GET_JOB_POST_BY_ID,
    variables: {
      user_id: user?.id,
      job_id: id,
    },
  })
  let { data, fetching, error } = result

  if (fetching) return <Loading />
  if (error) return <h1>{error.message}</h1>
  if (!data.job_post_by_pk) {
    return <PageNotFound />
  }

  const {
    title,
    company,
    description,
    location,
    url,
    status,
    tags,
    resumes,
    gists,
    emails,
    timelines,
    created_at,
  } = data.job_post_by_pk

  return (
    <div className='min-h-screen bg-gray-200'>
      <main className='py-2'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8'>
          <div className='sm:ml-4'>
            <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
            <p className='text-sm font-medium text-gray-500'>
              {company} | Status: {status}
            </p>
          </div>
        </div>

        <div className='mt-2 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3'>
          <div className='space-y-6 lg:col-start-1 lg:col-span-2'>
            <section aria-labelledby='applicant-information-title'>
              <div className='bg-white shadow sm:rounded-lg'>
                <div className='p-4 sm:px-6'>
                  <JobHeader />
                </div>
                <div className='bg-white px-4 pb-4 sm:px-2 sm:rounded-lg'>
                  <div className='sm:mt-0 sm:px-6'>
                    <Switch>
                      <Route exact path={path}>
                        <JobTab
                          jobId={id}
                          title={title}
                          company={company}
                          description={description}
                          location={location}
                          url={url}
                          status={status}
                          jobTags={tags}
                          userTags={data.user_by_pk.tags}
                        />
                      </Route>
                      <Route path={`${path}/resume`}>
                        <ResumeTab resumes={resumes} jobId={id} />
                      </Route>
                      <Route path={`${path}/email`}>
                        <EmailTab jobId={id} emails={emails} />
                      </Route>
                      <Route path={`${path}/code`}>
                        <GistTab jobId={id} gists={gists} />
                      </Route>
                    </Switch>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <TimelineFeed timelines={timelines} createdAt={created_at} />
        </div>
      </main>
    </div>
  )
}

export default JobRoutes
