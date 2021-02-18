import { useState } from 'react'
import TagFilterDropdown from './TagFilterDropdown'
import StatusFilterDropdown from './StatusFilterDropdown'
import JobCreate from './JobCreate'
import VerifyModal from 'component/Utility/VerifyModal'

export default function ButtonRow({
  isVerified,
  userTags,
  tagsFilter,
  setTags,
  statusFilter,
  setStatus,
}) {
  const [isCreating, setCreating] = useState(false)
  const [modal, setModal] = useState(false)

  return (
    <div>
      {modal && <VerifyModal setModal={setModal} />}
      {isCreating ? (
        <JobCreate setCreating={setCreating} />
      ) : (
        <div className='flex justify-between px-2 sm:px-0'>
          <button
            onClick={() => (isVerified ? setCreating(true) : setModal(true))}
            className='bg-indigo-500 hover:bg-indigo-700 justify-self-center text-white font-bold py-2 px-4 rounded-full focus:outline-none'
          >
            Create Job Post
          </button>
          <div className='space-x-2'>
            <TagFilterDropdown
              tagsFilter={tagsFilter}
              setTags={setTags}
              userTags={userTags}
            />
            <StatusFilterDropdown status={statusFilter} setStatus={setStatus} />
          </div>
        </div>
      )}
    </div>
  )
}
