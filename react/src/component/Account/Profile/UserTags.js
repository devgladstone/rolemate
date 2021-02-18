import { useState } from 'react'
import { useQuery, useMutation } from 'urql'
import { GET_USER_TAGS, CREATE_USER_TAG } from 'graphqlAPI'
import { useUser } from 'context/UserContext'
import TagRow from './TagRow'
import GenericModal from 'component/Utility/GenericModal'
import ErrorSVG from 'component/Utility/ErrorSVG'

export default function UserTags() {
  const { user } = useUser()
  const [tagFilter, setTag] = useState('')
  const [, executeCreateTag] = useMutation(CREATE_USER_TAG)
  const [modal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const [result] = useQuery({
    query: GET_USER_TAGS,
    variables: {
      id: user.id,
    },
  })

  let { data, fetching, error } = result
  if (fetching) return <h1>Loading...</h1>
  if (error) return <h1>{error.message}</h1>
  let { tags: userTags } = data.user_by_pk

  const onChange = ({ target }) => setTag(target.value.toLowerCase())

  const onCreate = async () => {
    setLoading(true)
    setErrorMsg('')
    setModal(true)
    const tag = tagFilter
    const newTags = userTags.concat(tag)
    try {
      await executeCreateTag({
        tags: '{' + newTags.join(',') + '}',
        user_id: user.id,
      })
      setTag('')
      setModal(false)
    } catch (err) {
      setErrorMsg('Error creating. Please try again later.')
      setLoading(false)
    }
  }

  return (
    <>
      {modal && (
        <GenericModal
          ImgSVG={ErrorSVG}
          title={errorMsg}
          subtext={'Okay'}
          isLoading={isLoading}
          setModal={setModal}
        />
      )}
      <div className='px-4 sm:px-6'>
        <div className='-ml-4 -mt-2'>
          <div className='ml-4 mt-2'>
            <h3 className='text-lg font-medium text-gray-900'>My Tags</h3>
          </div>
          <div className='ml-4 my-2 pb-2'>
            <label htmlFor='tag-filter' className='sr-only'>
              tag-filter
            </label>
            <p className='mb-2 text-sm text-gray-800' id='tag-description'>
              Enter a tag to filter tags or create a new tag.
            </p>
            <input
              type='text'
              onChange={onChange}
              value={tagFilter}
              id='tag-filter'
              className='px-2 py-2 text-left shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md'
              placeholder='Filter for tags...'
            />
          </div>
        </div>
        <div className='border border-gray-200 shadow flex justify-center sm:rounded-lg'>
          <dl className='divide-y divide-gray-200 w-full'>
            <dt className='mt-1 p-4 text-sm font-medium text-gray-900 bg-gray-50'>
              Tag
            </dt>

            {userTags.map((tag) => (
              <TagRow
                key={tag}
                tag={tag}
                tagFilter={tagFilter}
                userId={user.id}
                userTags={userTags}
              />
            ))}
            {tagFilter !== '' && !userTags.includes(tagFilter) && (
              <button
                onClick={onCreate}
                className='w-full text-left px-4 py-4 sm:py-5 sm:pt-5 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none'
              >
                {`Create new tag "${tagFilter}"`}
              </button>
            )}
          </dl>
        </div>
      </div>
    </>
  )
}
