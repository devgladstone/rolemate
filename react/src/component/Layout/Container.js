export default function Container({ children }) {
  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto py-6'>{children}</div>
    </div>
  )
}
