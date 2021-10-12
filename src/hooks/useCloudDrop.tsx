import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import request from "superagent"

function useCloudDrop() {
  const [imageUrl, setImageUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback(acceptedFile => {
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dmztdsduf/upload"
    const cloudinaryPreset = "qapnebg6"

    request
      .post(cloudinaryUrl)
      .field("upload_preset", cloudinaryPreset)
      .field("file", acceptedFile)
      .field("multiple", false)
      .on("progress", progress => {
        if (progress && progress.percent) {
          setUploadProgress(progress.percent)
        }
      })
      .end((error, response) => {
        if (response.body.public_id) {
          setImageUrl(response.body.public_id)
        }
        // public_id
        // convert .jpg to .webp
        // add a srcSet in the image component
        // with jpg and webP
        if (error) {
          throw new Error(error)
        }
      })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1
  })

  return {
    uploadProgress,
    onDrop,
    imageUrl,
    getRootProps,
    getInputProps,
    isDragActive
  }
}

export default useCloudDrop
