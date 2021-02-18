import { useState } from 'react'
import { useMutation } from 'urql'
import { useHistory } from 'react-router-dom'
import { CREATE_JOB_POST } from 'graphqlAPI'
import { useUser } from 'context/UserContext'
import Card from 'component/Layout/Card'
import JobPreview from './JobPreview'
import Loading from 'component/Utility/Loading'
import GenericModal from 'component/Utility/GenericModal'
import ErrorSVG from 'component/Utility/ErrorSVG'

export default function JobCreate({ setCreating }) {
  const { user } = useUser()
  const history = useHistory()
  const [state, setState] = useState({
    link: '',
    title: '',
    company: '',
    location: '',
    url: '',
    description: '',
  })
  const [isLoading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [, executeCreate] = useMutation(CREATE_JOB_POST)

  const onChange = ({ target }) =>
    setState({
      ...state,
      [target.name]: target.value,
    })

  const createJob = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await executeCreate({
        object: {
          title: state.title,
          company: state.company,
          description: state.description,
          location: state.location,
          url: state.url,
          user_id: user.id,
        },
      })
      history.push(`/jobs/${data.insert_job_post_one.id}`)
    } catch (err) {
      setErrorMsg('Error. Please try again later.')
      setModal(true)
      setLoading(false)
    }
  }

  return (
    <Card>
      {modal && (
        <GenericModal
          ImgSVG={ErrorSVG}
          title={errorMsg}
          subtext={'Okay'}
          setModal={setModal}
        />
      )}
      <div className='space-y-8'>
        <div>
          <div>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              Create Job Post
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Enter the job information to start.
            </p>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <form className='space-y-4' onSubmit={createJob}>
          <div className='space-y-8'>
            <div>
              <JobPreview {...state} onChange={onChange} />
            </div>
          </div>

          <div>
            <div className='flex justify-end'>
              <button
                type='button'
                className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                onClick={() => setCreating(false)}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}
    </Card>
  )
}
