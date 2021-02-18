export default function StatusBadge({ text, color }) {
  const colors = {
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    supergreen:
      'text-md font-extrabold border-4 border-double border-green-400 bg-green-100 text-green-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-sm font-medium ${colors[color]}`}
    >
      {text}
    </span>
  )
}
