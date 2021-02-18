import axios from 'axios'
import { useState } from 'react'
import { FILE_API } from 'config'
import { useMutation } from 'urql'
import { useUser } from 'context/UserContext'
import { CREATE_RESUME } from 'graphqlAPI'
import GenericModal from 'component/Utility/GenericModal'
import ErrorSVG from 'component/Utility/ErrorSVG'

export default function ResumeUpload({ jobId, setUploading, viewPdf }) {
  const { user } = useUser()
  const [file, setFile] = useState({
    data: null,
    uploadUrl: '',
    name: '',
    key: '',
  })
  const [modal, setModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [, executeCreate] = useMutation(CREATE_RESUME)

  const handleFile = async (e) => {
    const { name, type: mimetype } = e.target.files[0]
    const filename = name.split('.')[0]
    const extension = name.split('.')[1]
    const timeExtension = new Date().getTime().toString()
    try {
      const { data } = await axios.post(FILE_API + '/upload', {
        filename: filename + '-' + timeExtension,
        mimetype,
        extension,
      })
      setFile({
        data: e.target.files[0],
        uploadUrl: data.url,
        name: filename,
        key: filename + '-' + timeExtension + '.' + extension,
      })
    } catch ({ response }) {
      if (response.status === 415) {
        setErrorMsg('Please upload a PDF file.')
      } else {
        setErrorMsg('Unable to upload file. Please try again later.')
      }
      setModal(true)
    }
  }

  const onCancel = () => {
    setFile({
      data: null,
      uploadUrl: '',
      name: '',
      key: '',
    })
  }

  const onUpload = async () => {
    try {
      const url = `https://hire-me-uploads.s3.amazonaws.com/${file.key}`
      await axios.put(file.uploadUrl, file.data, {
        headers: {
          'Content-Type': file.data.type,
          'x-amz-acl': 'public-read-write',
        },
      })
      await executeCreate({
        object: {
          user_id: user.id,
          job_id: jobId,
          s3_key: file.key,
          filename: file.name,
          url,
        },
      })
      setUploading(false)
      viewPdf(url)
    } catch (err) {
      setModal(true)
    }
  }

  return (
    <div>
      {modal && (
        <GenericModal
          ImgSVG={ErrorSVG}
          title={errorMsg}
          subtext='Okay'
          isLoading={false}
          setModal={setModal}
        />
      )}
      <form>
        <div className='py-2'>
          <div className='sm:col-span-6'>
            {!file.data ? (
              <div className='mt-2 flex justify-center px-6 py-3 rounded-md'>
                <div className='space-y-1 text-center'>
                  <div className='flex justify-center text-sm text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer bg-blue-500 rounded-md text-lg p-3 font-medium text-white hover:bg-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-600'
                    >
                      <span>Upload PDF file</span>
                      <input
                        onChange={handleFile}
                        id='file-upload'
                        name='file-upload'
                        type='file'
                        className='sr-only'
                        accept='application/pdf'
                      />
                    </label>
                  </div>
                  <p className='text-xs text-gray-500'>PDF up to 2MB</p>
                </div>
              </div>
            ) : (
              <ul className='border border-gray-200 rounded-md'>
                <li className='pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5'>
                  <div className='w-0 flex-1 flex items-center'>
                    <svg
                      className='flex-shrink-0 h-5 w-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                      />
                    </svg>
                    <span className='ml-2 flex-1 w-0 truncate'>
                      {file.data.name}
                    </span>
                  </div>
                </li>
              </ul>
            )}
          </div>

          {file.uploadUrl !== '' && (
            <div className='py-4'>
              <div className='flex justify-end'>
                <button
                  onClick={onCancel}
                  type='button'
                  className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'
                >
                  Cancel
                </button>
                <button
                  onClick={onUpload}
                  type='button'
                  className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none'
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
      {file.uploadUrl === '' && (
        <div className='flex justify-end'>
          <button
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none'
            onClick={() => setUploading(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
