import React, { useCallback, useState, useRef, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import {
  MdLibraryMusic,
  IoIosAddCircle,
  IoIosCheckmarkCircle,
  MdVideoLibrary,
} from 'react-icons/all'
import { BsFolder } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { withToast } from '@/components'
import ImagePreviewModal from '@/components/ImageUpload/ImagePreviewModal'
import UploadTypeModal from '@/components/ImageUpload/UploadTypeModal'
import '@/assets/scss/pages/full-cycle/gratitude.scss'
import '@/assets/scss/pages/full-cycle/visualization.scss'
import type { ImageType } from '@/global.types'
import type { AppState } from '@/store'
import { getUserImages, updateUserImage } from '@/store/actions/images'
import { apiClientWithToken } from '@/store/apiClient'

const settings = {
  arrows: false,
  infinite: false,
  slidesToScroll: 1,
  slidesToShow: 2,
}

interface MusicType {
  id: number
  title: string
  selected: boolean
}

interface videoDurationType {
  id: number
  title: number
  selected: boolean
}

// interface photoType {
//   id: number
//   src: string
//   state: string
//   selected: boolean
// }

interface postType {
  musictypeId: number
  frametimeId: number
  // photoIds: number[];
}
const VisualizationPage: React.FC<{ toast: AnyFunction }> = ({ toast }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState([])
  const [uploadTypeModal, setUploadTypeModal] = useState(false)
  const [imagePreviewModal, setImagePreviewModal] = useState(false)
  const [musicType, setMusicType] = useState<MusicType[]>([])
  const [videoDuration, setVideoDuration] = useState<videoDurationType[]>([])
  const [condition, setCondition] = useState<boolean>(true)
  const [postData, setPostData] = useState<postType>()
  const [folderType, setFolderType] = useState(0)

  const userImages = useSelector((state: AppState) => state.images.images)

  const goToGratitudeSetting = () => {
    if (!condition) {
      setCondition(true)
      setVisualization()
    } else {
      toast('error')
    }
  }

  //##
  useEffect(() => {
    getUserImages(dispatch)
    getMusicType()
    getDuration()
  }, [])

  const setVisualization = async () => {
    await apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .post('/visualization/create', postData)
      .then(() => {
        navigate('/full-cycle/visualization-preview')
      })
      .catch((err) => {
        if (err.response === undefined) {
          toast('something went wrong')
        } else {
          toast(err.response.data)
        }
      })
  }

  const getMusicType = async () => {
    await apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .get('/visualization/musictype')
      .then((res) => {
        const data = res.data.items.map((item: any): MusicType => {
          return {
            id: item.id,
            selected: false,
            title: item.musictype,
          }
        })
        setMusicType(data)
      })
      .catch((err) => {
        if (err.response === undefined) {
          toast('something went wrong')
        } else {
          toast(err.response.data)
        }
        setMusicType([])
      })
  }

  const getDuration = async () => {
    await apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .get('/visualization/frametimes')
      .then((res) => {
        const data = res.data.items.map((item: any): MusicType => {
          return {
            id: item.id,
            selected: false,
            title: item.time + item.type,
          }
        })
        setVideoDuration(data)
      })
      .catch((err) => {
        if (err.response === undefined) {
          toast('something went wrong')
        } else {
          toast(err.response.data)
        }
        setVideoDuration([])
      })
  }

  const goToDashboard = useCallback(
    () => navigate('/dashboard/visualization'),
    [history]
  )
  const onFileInputChange = (event: any) => {
    const newFiles = event.target.files
    const allFiles = Array.from(files).concat(Array.from(newFiles))
    setFiles(allFiles)
    setImagePreviewModal(true)
  }

  const goToPreparePage = () => {
    setImagePreviewModal(false)
    setUploadTypeModal(false)
  }

  const openFileInput = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef?.current.click()
    }
  }

  const handleMusicType = (idx: number) => {
    const data = musicType.map((item: MusicType, index: number) => {
      if (index === idx) {
        item.selected = !item.selected
      } else {
        item.selected = false
      }
      return item
    })
    setMusicType(data)
    setCondition(comparecondition())
  }

  const handleVideoDuration = (idx: number) => {
    const data = videoDuration.map((item: videoDurationType, index: number) => {
      if (index === idx) {
        item.selected = !item.selected
      } else {
        item.selected = false
      }
      return item
    })
    setVideoDuration(data)
    setCondition(comparecondition())
  }

  const handleImages = (item: ImageType) => {
    item.isVisualization = !item.isVisualization
    updateUserImage(item, dispatch)
    setCondition(comparecondition())
  }

  const comparecondition = (): boolean => {
    const photos = userImages
      .filter((item: ImageType) => item.isVisualization)
      .map((item: ImageType) => item.id)
    const musictype = musicType
      .filter((item: MusicType) => item.selected)
      .map((item: MusicType) => item.id)
    const frametime = videoDuration
      .filter((item: videoDurationType) => item.selected)
      .map((item: videoDurationType) => item.id)
    if (photos.length === 0) return true
    if (musictype.length === 0) return true
    if (frametime.length === 0) return true
    setPostData({
      frametimeId: frametime[0],
      musictypeId: musictype[0],
      // photoIds: photos,
    })
    return false
  }
  return (
    <div className="page-container d-flex flex-column justify-content-center align-items-center container">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h3 className="page-title text-secondary-color mb-5 text-center">
            Finally, Alexis, here is how you practice Visualization!
          </h3>
          <p className="paragraph text-gray-color--1 mb-6">
            The final step here is to select images/videos that you want to
            practice Visualization. Then, choose what type of music and duration
            of the music that you want it to play along with your Visualization
            video later.
          </p>
        </div>
      </div>
      <div className="photo-folder container">
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-2 bg-transparent">
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
                        {userImages.length > 0 &&
                          userImages.map((item: ImageType, index: number) => {
                            if (item.state === 'present') {
                              return (
                                <div key={index} className="image-frame">
                                  <input
                                    type="checkbox"
                                    className="image-checkbox"
                                    id={`imageCheckbox${item.id}`}
                                    checked={item.isVisualization}
                                    onChange={() => handleImages(item)}
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
                    {userImages.map((item: ImageType, index: number) => {
                      if (item.state === 'present') {
                        return (
                          <div key={index} className="col-md-4 image-frame">
                            <input
                              type="checkbox"
                              className="image-checkbox"
                              id={`imageCheckbox${item.id}`}
                              checked={item.isVisualization}
                              onChange={() => handleImages(item)}
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
            <div className="card mb-2 bg-transparent">
              <div className="card-header sub-title d-flex justify-content-center align-items-center bg-gray-color--5 text-center text-white">
                <BsFolder className="margin-right-sm" size={23} />
                Future Folder
              </div>
              <div className="container">
                {isMobile ? (
                  <div className="row">
                    <div className="col">
                      <Slider {...settings}>
                        {userImages.map((item: ImageType, index: number) => {
                          if (item.state === 'future') {
                            return (
                              <div key={index} className="image-frame">
                                <input
                                  type="checkbox"
                                  className="image-checkbox"
                                  id={`imageCheckbox${item.id}`}
                                  checked={item.isVisualization}
                                  onChange={() => handleImages(item)}
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
                    {userImages.map((item: ImageType, index: number) => {
                      if (item.state === 'future') {
                        return (
                          <div key={index} className="col-md-4 image-frame">
                            <input
                              type="checkbox"
                              className="image-checkbox"
                              id={`imageCheckbox${item.id}`}
                              checked={item.isVisualization}
                              onChange={() => handleImages(item)}
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
      <div className="row w-100 mt-5">
        <div className="col-md-12">
          <div className="card bg-transparent">
            <div className="card-header sub-title d-flex justify-content-center align-items-center text-primary-color bg-transparent text-center">
              Visualization Setting
            </div>
            <div className="text-primary-color container p-2">
              <div className="row p-1">
                <div className="col-md-4 mb-1">
                  <MdLibraryMusic size={24} className="mr-2" />
                  Background Music Type :
                </div>
                <div
                  className="col-md-8 d-flex flex-wrap"
                  style={{ gap: '1rem' }}
                >
                  {musicType.map((type, index) => {
                    return (
                      <div key={type.id} className="music-type-button mb-1">
                        <input
                          type="checkbox"
                          id={`musicType${type.id}`}
                          className="music-type-checkbox"
                          checked={type.selected}
                          onChange={() => handleMusicType(index)}
                        />
                        <label
                          htmlFor={`musicType${type.id}`}
                          className="music-type-label"
                          style={{ width: '100%' }}
                        >
                          {type.title}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="row d-flex p-1" style={{ alignItems: 'center' }}>
                <div className="col-md-4 mb-1">
                  <MdVideoLibrary size={24} className="mr-2" />
                  Auto-Play Video Duration :
                </div>
                <div className="col-md-8 d-flex" style={{ gap: '1rem' }}>
                  {videoDuration.map((duration, index) => {
                    return (
                      <div key={duration.id} className="video-duration-button">
                        <input
                          type="checkbox"
                          id={`videoDuration${duration.id}`}
                          className="video-duration-checkbox"
                          checked={duration.selected}
                          onChange={() => handleVideoDuration(index)}
                        />
                        <label
                          htmlFor={`videoDuration${duration.id}`}
                          className="video-duration-label"
                          style={{ width: '100%' }}
                        >
                          {duration.title}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row w-100 py-5">
        <div className="col-md-6 offset-md-3">
          <div>
            <button
              disabled={condition}
              type="button"
              className={`${
                isMobile
                  ? 'd-block paragraph nextbtn'
                  : 'btn-block button-label'
              } btn btn-sm mindmail-button button-primary w-100 mx-auto px-4`}
              onClick={goToGratitudeSetting}
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
        goToPreparePage={goToPreparePage}
      />
    </div>
  )
}

export default withToast(VisualizationPage)
