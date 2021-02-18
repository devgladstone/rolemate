import TagBadge from './TagBadge'
import TagDropdown from './TagDropdown'

export default function TagBlock({ jobId, grid, jobTags, userTags }) {
  return (
    <div className='space-y-2'>
      {!grid && (
        <h3 className='text-sm leading-5 font-medium text-gray-800'>Tags</h3>
      )}
      {jobTags.map((tag) => (
        <TagBadge key={tag} jobId={jobId} tag={tag} />
      ))}
      <div>
        {!grid && (
          <TagDropdown jobId={jobId} userTags={userTags} jobTags={jobTags} />
        )}
      </div>
    </div>
  )
}
