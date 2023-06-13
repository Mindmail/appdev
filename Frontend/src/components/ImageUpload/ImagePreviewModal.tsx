import React, { useEffect, useState } from 'react'
import ReactS3Client from 'react-aws-s3-typescript'
import { Modal } from 'react-bootstrap'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import { getUserImages } from '@/store/actions/images'
import { apiClientWithToken } from '@/store/apiClient'

// import pic from '../../assets/images/slidingImage1.png'

import '@/assets/scss/components/image-preview-modal.scss'

import { uuidv4 } from '../../common/Generator'
import { s3Config } from '../../common/s3Config'

interface ImageArray {
  src: string
  id: string
  selected: boolean
  file: any
}

const initialImage = {
  file: '',
  id: '',
  selected: false,
  src: '',
}
const ImagePreviewModal: React.FC<{
  folderType: number
  imagePreviewModal: boolean
  setImagePreviewModal: any
  goToPreparePage: any
  files: any
}> = ({
  folderType,
  imagePreviewModal,
  setImagePreviewModal,
  goToPreparePage,
  files,
}) => {
  const [items, setItems] = useState<ImageArray[]>([initialImage])
  const [selectError, setSelectError] = useState<string>('')
  const [isdisable, setIsdisable] = useState<boolean>(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const ImageArray = Object.entries(files).map((e: any, index: number) => {
      return {
        file: e[1],
        id: index.toString(),
        selected: false,
        src: URL.createObjectURL(e[1]),
      }
    })

    setItems(ImageArray)
    setIsdisable(false)
  }, [files])

  const handleUpload = async () => {
    if (files.length === 0) {
      setSelectError('There are no file updated')
      return
    }
    const filterData = items.filter((item) => item.selected)
    if (filterData.length === 0) {
      setSelectError('There are no file selected')
      return
    }
    setIsdisable(true)
    filterData.map(async (item: any, index: number) => {
      const s3 = new ReactS3Client(s3Config)
      await s3.uploadFile(item.file, uuidv4()).then(async (data: any) => {
        if (data.status === 204) {
          await apiClientWithToken(localStorage.getItem('mindmailtoken'))
            .post('/visualization/images', { data, folderType })
            .then(() => {
              if (index + 1 === filterData.length) {
                getUserImages(dispatch)
                setIsdisable(false)
                goToPreparePage()
              }
            })
        } else {
          // console.log('fail')
        }
      })
    })
  }

  const handleSelection = (index: string) => {
    const newItems = items.map((item: any) => {
      if (item.id === index) {
        item.selected = !item.selected
      }
      return item
    })
    setItems(newItems)
  }
  return (
    <Modal
      show={imagePreviewModal}
      onHide={() => setImagePreviewModal(false)}
      centered
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="image-preview-modal"
    >
      <Modal.Body>
        <div className="image-preview-modal-content px-2">
          <>{selectError}</>
          {items.map((image: any, idx: number) => {
            return (
              <div className="select-image-card" key={idx}>
                <input
                  type="checkbox"
                  className="image-checkbox"
                  id={image.id}
                  checked={image.selected}
                  onChange={() => handleSelection(image.id)}
                />
                <label htmlFor={image.id} className="image-label">
                  <div className="selected-wrapper">
                    <AiFillCheckCircle size={30} />
                  </div>
                  <img src={image.src} className="image-size" alt="" />
                </label>
              </div>
            )
          })}
        </div>
        <div className="actions">
          <button
            onClick={() => setImagePreviewModal(false)}
            style={{ width: '45%' }}
            type="button"
            className="btn btn-sm mindmail-button button-label button-outline"
          >
            Cancel
          </button>
          <button
            type="button"
            style={{ width: '45%' }}
            className="btn btn-sm mindmail-button button-label button-primary"
            onClick={() => handleUpload()}
            disabled={isdisable}
          >
            Choose for upload
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ImagePreviewModal
