import React, { useRef, useState } from 'react'
import { FileDrop } from 'react-file-drop'

import UploadTypeModal from '@/components/ImageUpload/UploadTypeModal'

import UploadFileIcon from '../../assets/icons/UploadFileIcon'

import ImagePreviewModal from './ImagePreviewModal'
import '../../assets/scss/components/image-upload.scss'

const ImageUpload: React.FC<{ handleUploadImage: any }> = ({
  handleUploadImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState([])
  const [uploadTypeModal, setUploadTypeModal] = useState(false)
  const [imagePreviewModal, setImagePreviewModal] = useState(false)

  const onFileInputChange = (event: any) => {
    const newFiles = event.target.files
    const allFiles = Array.from(files).concat(Array.from(newFiles))
    setFiles(allFiles)
    setImagePreviewModal(true)
  }

  const onDropFile = (dropFiles: any) => {
    const allFiles = Array.from(files).concat(Array.from(dropFiles))
    setFiles(allFiles)
    setImagePreviewModal(true)
  }
  const openFileInput = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef?.current.click()
    }
  }
  const goToPreparePage = () => {
    handleUploadImage(false)
    setUploadTypeModal(false)
  }
  const onTargetClick = () => {
    setFiles([])
    setUploadTypeModal(true)
  }
  return (
    <>
      <FileDrop
        onTargetClick={onTargetClick}
        onDrop={(files) => onDropFile(files)}
        className="position-relative drag-drop-area text-center"
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
        <p className="label text-secondary-color mb-0 mt-3">
          Drag or drop images/videos or click icon to upload from your computer
          or your Facebook albums
        </p>
        <p className="label text-gray-color--6 pt-2">
          *The size for uploading one image or one video is limited under 5MB*
        </p>
      </FileDrop>
      <UploadTypeModal
        uploadTypeModal={uploadTypeModal}
        handleUploadTypeModal={setUploadTypeModal}
        openFileInput={openFileInput}
      />
      <ImagePreviewModal
        folderType={0}
        files={files}
        imagePreviewModal={imagePreviewModal}
        setImagePreviewModal={setImagePreviewModal}
        goToPreparePage={goToPreparePage}
      />
    </>
  )
}

export default ImageUpload
