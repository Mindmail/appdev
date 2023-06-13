import React, { useCallback, useState, useRef, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { BsFolder } from 'react-icons/bs'
import { IoIosAddCircle, IoIosCheckmarkCircle } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'

import ImagePreviewModal from '@/components/ImageUpload/ImagePreviewModal'
import UploadTypeModal from '@/components/ImageUpload/UploadTypeModal'
import type { ImageType } from '@/global.types'
import type { AppState } from '@/store'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@/assets/scss/pages/full-cycle/gratitude.scss'
import { getUserImages, updateUserImage } from '@/store/actions/images'

const settings = {
  arrows: false,
  infinite: false,
  slidesToScroll: 1,
  slidesToShow: 2,
}

const Gratitude: React.FC = () => {
  const [letsGo, setletsGo] = useState<boolean>(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userImages = useSelector((state: AppState) => state.images.images)

  useEffect(() => {
    getUserImages(dispatch)
  }, [])

  useEffect(() => {
    const items = userImages.filter((item) => item.isGratitude)
    if (items.length > 0) setletsGo(false)
    else setletsGo(true)
  }, [userImages])

  const goToGratitudeSetting = () => {
    navigate('/full-cycle/gratitude-setting')
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  const goToDashboard = useCallback(
    () => navigate('/dashboard/gratitude'),
    [history]
  )

  const [files, setFiles] = useState([])
  const [uploadTypeModal, setUploadTypeModal] = useState(false)
  const [imagePreviewModal, setImagePreviewModal] = useState(false)
  const [folderType, setFolderType] = useState(0)

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

  const handleSelectPhoto = (item: ImageType) => {
    item.isGratitude = !item.isGratitude
    updateUserImage(item, dispatch)
  }

  // const handleUploadTypeModal = () => {
  //   setFiles([])
  //   setUploadTypeModal(true)
  // }
  return (
    <div className="page-container d-flex flex-column justify-content-center align-items-center container">
      <h3 className="page-title text-secondary-color mb-5 text-center">
        Now, choose the images/videos in your folders that you want to write
        grateful messages later.{' '}
      </h3>
      <div className="photo-folder container">
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-transparent">
              <div className="card-header sub-title d-flex justify-content-center align-items-center bg-gray-color--5 text-center text-white">
                <BsFolder className="margin-right-sm" size={23} />
                Present Folder
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
                  <div className="row">
                    <div className="col">
                      <Slider {...settings}>
                        {userImages.map((item: any, index: any) => {
                          if (item.state === 'present') {
                            return (
                              <div key={index} className="image-frame">
                                <input
                                  type="checkbox"
                                  className="image-checkbox"
                                  id={`imageCheckbox${item.id}`}
                                  checked={item.isGratitude}
                                  onChange={() => handleSelectPhoto(item)}
                                />
                                <label
                                  htmlFor={`imageCheckbox${item.id}`}
                                  className="image-label"
                                  style={{ width: '100%' }}
                                >
                                  <div className="selected-wrapper">
                                    <IoIosCheckmarkCircle size="30" />
                                  </div>
                                  <img
                                    src={item.photoURL}
                                    alt=""
                                    className="image"
                                  />
                                </label>
                              </div>
                            )
                          }
                        })}
                      </Slider>
                      <div className="w-50 image-frame mx-auto">
                        <button
                          className="btn add-photo-button"
                          onClick={() => {
                            setUploadTypeModal(true)
                            setFolderType(1)
                          }}
                        >
                          <IoIosAddCircle size={30} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row p-1">
                    {userImages.map((item: any, index: any) => {
                      if (item.state === 'present') {
                        return (
                          <div key={index} className="col-md-4 image-frame">
                            <input
                              type="checkbox"
                              className="image-checkbox"
                              id={`imageCheckbox${item.id}`}
                              checked={item.isGratitude}
                              onChange={() => handleSelectPhoto(item)}
                            />
                            <label
                              htmlFor={`imageCheckbox${item.id}`}
                              className="image-label"
                              style={{ width: '100%' }}
                            >
                              <div className="selected-wrapper">
                                <IoIosCheckmarkCircle size="30" />
                              </div>
                              <img
                                src={item.photoURL}
                                alt=""
                                className="image"
                              />
                            </label>
                          </div>
                        )
                      }
                    })}
                    <div className="col-md-4 image-frame">
                      <button
                        className="btn add-photo-button"
                        onClick={() => {
                          setUploadTypeModal(true)
                          setFolderType(1)
                        }}
                      >
                        <IoIosAddCircle size={30} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-transparent">
              <div className="card-header sub-title d-flex justify-content-center align-items-center bg-gray-color--5 text-center text-white">
                <BsFolder className="margin-right-sm" size={23} />
                Future Folder
              </div>
              <div className="container">
                {isMobile ? (
                  <div className="row">
                    <div className="col">
                      <Slider {...settings}>
                        {userImages.map((item: any, index: any) => {
                          if (item.state === 'future') {
                            return (
                              <div key={index} className="image-frame">
                                <input
                                  type="checkbox"
                                  className="image-checkbox"
                                  id={`imageCheckbox${item.id}`}
                                  checked={item.isGratitude}
                                  onChange={() => handleSelectPhoto(item)}
                                />
                                <label
                                  htmlFor={`imageCheckbox${item.id}`}
                                  className="image-label"
                                  style={{ width: '100%' }}
                                >
                                  <div className="selected-wrapper">
                                    <IoIosCheckmarkCircle size="30" />
                                  </div>
                                  <img
                                    src={item.photoURL}
                                    alt=""
                                    className="image"
                                  />
                                </label>
                              </div>
                            )
                          }
                        })}
                      </Slider>
                      <div className="w-50 image-frame mx-auto">
                        <button
                          className="btn add-photo-button"
                          onClick={() => {
                            setUploadTypeModal(true)
                            setFolderType(2)
                          }}
                        >
                          <IoIosAddCircle size={30} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row p-1">
                    {userImages.map((item: any, index: any) => {
                      if (item.state === 'future') {
                        return (
                          <div key={index} className="col-md-4 image-frame">
                            <input
                              type="checkbox"
                              className="image-checkbox"
                              id={`imageCheckbox${item.id}`}
                              checked={item.isGratitude}
                              onChange={() => handleSelectPhoto(item)}
                            />
                            <label
                              htmlFor={`imageCheckbox${item.id}`}
                              className="image-label"
                              style={{ width: '100%' }}
                            >
                              <div className="selected-wrapper">
                                <IoIosCheckmarkCircle size="30" />
                              </div>
                              <img
                                src={item.photoURL}
                                alt=""
                                className="image"
                              />
                            </label>
                          </div>
                        )
                      }
                    })}
                    <div className="col-md-4 image-frame">
                      <button
                        className="btn add-photo-button"
                        onClick={() => {
                          setUploadTypeModal(true)
                          setFolderType(2)
                        }}
                      >
                        <IoIosAddCircle size={30} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row w-100 py-5 text-center">
        <div className="col-md-6 offset-md-3">
          <div>
            <button
              type="button"
              className={`${
                isMobile ? 'd-block paragraph' : 'btn-block button-label'
              } btn btn-sm mindmail-button button-primary w-100 mx-auto px-4`}
              onClick={goToGratitudeSetting}
              disabled={letsGo}
            >
              Let’s go!
            </button>
          </div>
          <div>
            <button
              type="button"
              className={`${
                isMobile
                  ? 'd-block label button-link mx-auto'
                  : 'btn-block button-label button-outline'
              } btn btn-sm mindmail-button w-100 mt-3`}
              onClick={goToDashboard}
            >
              I want to exit from this cycle.
            </button>
          </div>
        </div>
      </div>
      <UploadTypeModal
        uploadTypeModal={uploadTypeModal}
        handleUploadTypeModal={setUploadTypeModal}
        openFileInput={openFileInput}
      />
      <ImagePreviewModal
        folderType={folderType}
        files={files}
        imagePreviewModal={imagePreviewModal}
        setImagePreviewModal={setImagePreviewModal}
        goToPreparePage={setImagePreviewModal}
      />
    </div>
  )
}

export default Gratitude
