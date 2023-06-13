import React, { useState, useRef } from 'react'
import { FileDrop } from 'react-file-drop'

import UploadFileIcon from '../../assets/icons/UploadFileIcon'

import '../../assets/scss/components/image-upload.scss'

// const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000

const ImageBrowser: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState([])

  const onFileInputChange = (event: any) => {
    const newFiles = event.target.files

    setFiles(files.concat(newFiles))
    // console.log(files)
    // do something with your files...
  }
  const onTargetClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef?.current.click()
    }
  }
  return (
    <>
      <FileDrop
        onTargetClick={onTargetClick}
        className="position-relative text-center"
      >
        <input
          onChange={onFileInputChange}
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          className="position-absolute invisible"
          multiple
        />
        <UploadFileIcon />
        <p className="label text-primary-color">
          Drag or drop images/videos or click icon to upload from your computer
          or your Facebook albums
        </p>
        <p className="label text-primary">
          *The size for uploading one image or one video is limited under 5MB*
        </p>
      </FileDrop>
    </>
  )
}

export default ImageBrowser
