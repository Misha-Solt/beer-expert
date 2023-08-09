import React from 'react'
import axios from '../../../util/axiosInstance'

export const UploadForm = () => {
  const onSubmitUpload = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    //Post request to the server with the filedata
    try {
      const res = await axios.post('/api/files/upload', formData)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div>UploadForm</div>
      <form onSubmit={onSubmitUpload}>
        <input type="file" name="image" multiple={false} />
        <button>Upload</button>
      </form>
    </>
  )
}
