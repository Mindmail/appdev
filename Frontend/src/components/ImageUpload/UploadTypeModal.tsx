import React from 'react'
import { Modal } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { FaFacebookSquare } from 'react-icons/fa'
import { MdComputer } from 'react-icons/md'
import '@/assets/scss/components/image-upload.scss'

const UploadTypeModal: React.FC<{
  uploadTypeModal: boolean
  handleUploadTypeModal: any
  openFileInput: any
}> = ({ uploadTypeModal, handleUploadTypeModal, openFileInput }) => {
  return (
    <Modal
      show={uploadTypeModal}
      onHide={() => handleUploadTypeModal(false)}
      centered
      aria-labelledby="contained-modal-title-vcenter"
      className="upload-type-modal"
    >
      {!isMobile && <Modal.Header closeButton />}
      <Modal.Body>
        {isMobile ? (
          <div className="d-flex flex-column text-center">
            <button
              className="from-local text-primary-color font-weight-500 border-0 p-2"
              onClick={openFileInput}
            >
              Photo Library
            </button>
            <button className="from-local text-primary-color font-weight-500 border-top-primary-1 border-0 p-2">
              Facebook
            </button>
            <button
              className="from-local text-primary-color font-weight-500 border-top-primary-1 border-0 p-2"
              onClick={() => handleUploadTypeModal(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <button
              className="btn from-local text-white"
              onClick={openFileInput}
            >
              <p className="button-image-wrapper">
                <MdComputer size={20} />
              </p>
              <p className="smallest-label mb-0 mt-1 text-center">Computer</p>
            </button>
            <button className="btn from-local text-white">
              <p className="button-image-wrapper">
                <FaFacebookSquare size={20} />
              </p>
              <p className="smallest-label mb-0 mt-1 text-center">Facebook</p>
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default UploadTypeModal
