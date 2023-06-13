import React, { useState, useEffect } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import '../../assets/scss/components/select-avatar-dialog.scss'
import { isMobile } from 'react-device-detect'
import { IoMdCheckmarkCircle } from 'react-icons/all'
import Slider from 'react-slick'

import { getChatBuddyAvatars } from '@/store/actions/chatbuddy'
import '../../assets/scss/app.scss'
interface chatbuddy {
  id: number
  buddyId: number
  photoURL: string
}

const SelectAvatarDialog: React.FC<{
  show: boolean
  handleCloseDialog: any
  setSelectedBuddy?: any
}> = ({ show, handleCloseDialog, setSelectedBuddy }) => {
  const [images, setImages] = useState<chatbuddy[]>([])
  const [selectedImage, setSelectedImage] = useState<any>(null)
  useEffect(() => {
    getChatBuddyAvatars()
      .then((res) => {
        setImages(res.data.items)
      })
      .catch((err) => {
        if (err.response === undefined) {
          // console.log('something went wrong')
        } else {
          // console.log(err.response.data)
        }
      })
  }, [])

  function getSelectedImage(img: any) {
    setSelectedImage(img)
  }
  function getSelectedImageUrl() {
    if (selectedImage) {
      // console.log(selectedImage)
      setSelectedBuddy({
        id: selectedImage.id,
        photoURL: selectedImage.photoURL,
      })
    } else if (images && images.length > 0) {
      setSelectedBuddy({
        id: images[0].id,
        photoURL: images[0].photoURL,
      })
    }
    handleCloseDialog()
  }

  return (
    <Modal show={show} size="lg" onHide={() => handleCloseDialog(false)}>
      <ModalHeader closeButton className="custom-modal-header">
        <div className="w-100 text-center">
          <p className="button-label text-primary-color mb-0">
            Choose a photo to be your Mindmail journey's buddy
          </p>
        </div>
      </ModalHeader>
      <ModalBody>
        {isMobile ? (
          <div className="avatars-mobile">
            {images?.map((image, idx) => {
              return (
                <button
                  className={
                    'avatar-card border-0 bg-transparent ' +
                    (image.id == selectedImage?.id ? ' img-selected ' : '')
                  }
                  key={idx}
                  onClick={() => getSelectedImage(image)}
                >
                  <img src={image.photoURL} alt="" />
                  <div className="background-selected" />
                  <div className="selected-wrapper">
                    <IoMdCheckmarkCircle size="30" />
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <Slider
            infinite={true}
            centerMode={true}
            focusOnSelect={true}
            slidesToShow={images.length < 6 ? images.length : 5}
            slidesToScroll={3}
          >
            {images?.length &&
              images.map((image) => {
                return (
                  <button
                    key={image?.id}
                    className="img-container border-0 bg-transparent"
                    onClick={() => getSelectedImage(image)}
                  >
                    <img
                      className={
                        selectedImage?.id === image?.id ? 'img-selected' : ''
                      }
                      src={image?.photoURL}
                      alt=""
                    />
                  </button>
                )
              })}
          </Slider>
        )}

        <div
          className={
            (isMobile ? 'w-100 flex-column ' : 'w-50 flex-row ') +
            ' d-flex justify-content-between margin-top-md ml-auto mr-auto flex-row'
          }
        >
          <button
            onClick={handleCloseDialog}
            style={{ width: !isMobile ? '45%' : '75%' }}
            type="button"
            className="btn mindmail-button button-label button-outline ml-auto mr-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            style={{
              marginTop: isMobile ? '1em' : '0',
              width: !isMobile ? '45%' : '75%',
            }}
            className="btn mindmail-button button-label button-primary ml-auto mr-auto"
            onClick={getSelectedImageUrl}
          >
            Select this photo
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default SelectAvatarDialog

// Choose a photo to be your Mindmail journey's buddy
