import React from 'react'
import { Modal } from 'react-bootstrap'

type AdvertisingModalTypes = {
  show: boolean
  onHide(): void
  title: string
  content: string
  video: any
}

const AdvertisingModal: React.FC<AdvertisingModalTypes> = ({
  show,
  onHide,
  title,
  content,
  video,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      aria-labelledby="contained-modal-title-vcenter"
      className="goal-edit-content-modal"
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="w-100 text-primary-color sub-title text-center">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-content">
        <div>
          <video controls width="100%">
            <source src={video} type="video/mp4" />
            <track kind="captions" />
          </video>
        </div>
        <div className="text-md-justify text-gray-color--1 modal-content-label text-left">
          <p>{content}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-left modal-footer">
        <div className="modal-btn-mobile">
          <button
            className="btn btn-mindmail btn-mindmail-primary"
            onClick={onHide}
            style={{ float: 'right' }}
          >
            Let's watch
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default AdvertisingModal
