import React, { useState, useRef } from 'react'
import '@/assets/scss/components/photo-folder.scss'
import { isMobile } from 'react-device-detect'
import { IoIosAddCircle, IoIosCheckmarkCircle, FaFolder } from 'react-icons/all'
import Slider from 'react-slick'

import ImagePreviewModal from '@/components/ImageUpload/ImagePreviewModal'
import UploadTypeModal from '@/components/ImageUpload/UploadTypeModal'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import PhotoItem from '../PhotoItem/PhotoItem'

const PhotoFolder: React.FC<{
  isGratitude: number
  folder: any
  updateImage: any
}> = ({ isGratitude, folder, updateImage }) => {
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
  const openFileInput = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef?.current.click()
    }
  }

  const settings = {
    arrows: false,
    centerMode: false,
    centerPadding: '10px',
    focusOnSelect: true,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 2,
  }

  const onImageCheck = (item: any) => {
    let updateParams
    if (isGratitude) {
      updateParams = { id: item.id, isGratitude: !item.isGratitude }
    } else {
      updateParams = { id: item.id, isVisualization: !item.isVisualization }
    }

    updateImage(updateParams)
  }

  return (
    <div className="card photo-folder bg-transparent">
      <div className="card-header sub-title d-flex justify-content-center align-items-center bg-gray-color--5 text-center text-white">
        <FaFolder className="margin-right-sm" size={23} />
        {folder.folderName}
        <input
          onChange={onFileInputChange}
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          className="position-absolute invisible"
          multiple
        />
      </div>
      <div className="container">
        {isMobile ? (
          <>
            <Slider {...settings}>
              {folder.items &&
                folder.items.map((item: any, index: any) => (
                  <div key={index} className="col-md-4 image-frame">
                    <input
                      type="checkbox"
                      className="image-checkbox"
                      defaultChecked={
                        isGratitude ? item.isGratitude : item.isVisualization
                      }
                      id={`imageCheckbox${item.id}`}
                    />
                    <label
                      htmlFor={`imageCheckbox${item.id}`}
                      className="image-label"
                    >
                      <div className="selected-wrapper">
                        <IoIosCheckmarkCircle size="30" />
                      </div>
                      <img src={item.photoURL} alt="" className="image" />
                    </label>
                  </div>
                ))}
            </Slider>

            <div className="col-6 offset-3 image-frame">
              <button
                className="btn add-photo-button"
                onClick={() => {
                  setUploadTypeModal(true)
                }}
              >
                <IoIosAddCircle size={30} />
              </button>
            </div>
          </>
        ) : (
          <div className="row p-1">
            {folder.items &&
              folder.items.map((item: any, index: any) => (
                <div key={index} className="col-md-4 image-frame">
                  <input
                    type="checkbox"
                    className="image-checkbox"
                    id={`imageCheckbox${item.id}`}
                    defaultChecked={
                      isGratitude ? item.isGratitude : item.isVisualization
                    }
                    onChange={() => onImageCheck(item)}
                  />
                  <label
                    htmlFor={`imageCheckbox${item.id}`}
                    className="image-label"
                  >
                    <div className="selected-wrapper">
                      <IoIosCheckmarkCircle size="30" />
                    </div>
                    <img src={item.photoURL} alt="" className="image" />
                  </label>
                </div>
              ))}
            <div className="col-md-4 image-frame">
              <button
                className="btn add-photo-button"
                onClick={() => {
                  setUploadTypeModal(true)
                }}
              >
                <IoIosAddCircle size={30} />
              </button>
            </div>
          </div>
        )}
      </div>
      <UploadTypeModal
        uploadTypeModal={uploadTypeModal}
        handleUploadTypeModal={setUploadTypeModal}
        openFileInput={openFileInput}
      />
      <ImagePreviewModal
        folderType={folder.id}
        files={files}
        imagePreviewModal={imagePreviewModal}
        setImagePreviewModal={setImagePreviewModal}
        goToPreparePage={setImagePreviewModal}
      />
    </div>
  )
}

export default PhotoFolder
