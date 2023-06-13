import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import {
  IoIosTime,
  IoEllipsisHorizontal,
  MdLibraryMusic,
  MdVideoLibrary,
} from 'react-icons/all'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteUserImage } from '@/store/actions/images'

import '@/assets/scss/components/history.scss'

const History: React.FC<{
  historyItem: any
  historyType: any
}> = ({ historyItem, historyType }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [historyModal, setHistoryModal] = useState(false)
  const [deleteGratitudeModal, setDeleteGratitudeModal] = useState(false)

  const handleHistoryModal = (action: any) => {
    if (action === 1) {
      if (historyType.toLowerCase() === 'gratitude')
        navigate('/full-cycle/gratitude-setting')
      else navigate('/full-cycle/visualization-preview')
    } else if (action === 2) {
      setDeleteGratitudeModal(true)
    } else if (action === 3) {
      setDeleteGratitudeModal(false)
      setHistoryModal(false)
      deleteUserImage(historyItem, dispatch)
    }
  }
  return (
    <div className="card history-item bg-transparent">
      <div className="card-header d-flex justify-content-between align-items-center text-primary-color bg-transparent">
        <div className="history-meta d-flex align-items-center">
          <IoIosTime size={32} />
          <span className="label text-gray-color--1 mx-1">
            {historyItem.datetime}
          </span>
        </div>
        <button
          className="btn setting text-primary-color"
          onClick={() => setHistoryModal(true)}
        >
          <IoEllipsisHorizontal size={20} />
        </button>
      </div>
      <div className="card-body">
        <img className="card-img-top" src={historyItem.photoURL} alt="card" />
        {historyType.toLowerCase() === 'gratitude' ? (
          <h5 className="card-title sub-title text-secondary-color p-2">
            {historyItem.description}
          </h5>
        ) : (
          <h5 className="card-title text-primary-color p-2">
            <MdLibraryMusic size={20} />
            <span className="music-type label">{historyItem.musicType}</span>
            <MdVideoLibrary size={20} />
            <span className="video-duration label">
              {historyItem.videoDuration}
            </span>
          </h5>
        )}
      </div>

      <Modal
        show={deleteGratitudeModal}
        onHide={() => {
          setDeleteGratitudeModal(false)
        }}
        centered
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        className="history-delete-modal"
      >
        <Modal.Header closeButton>
          <p className="button-label text-primary-color w-100 mb-0 text-center">
            Delete this {historyType.toLowerCase()}
          </p>
        </Modal.Header>
        <Modal.Body className="px-5">
          <img className="card-img-top" src={historyItem.photoURL} alt="card" />
          {historyType.toLowerCase() === 'gratitude' && (
            <h5 className="card-title label text-secondary-color m-0 px-3 py-2">
              {historyItem.description}
            </h5>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <button
            className="mindmail-button btn btn-sm button-outline"
            onClick={() => {
              setDeleteGratitudeModal(false)
            }}
          >
            Cancel
          </button>
          <button
            className="mindmail-button btn btn-sm button-primary"
            onClick={() => handleHistoryModal(3)}
          >
            Yes, delete it!
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={historyModal}
        onHide={() => {
          setHistoryModal(false)
        }}
        centered
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        className="history-edit-modal"
      >
        <Modal.Body>
          <button
            className="modal-button"
            onClick={() => handleHistoryModal(1)}
          >
            Launch this {historyType.toLowerCase()}
          </button>
          <button
            className="modal-button"
            onClick={() => handleHistoryModal(2)}
          >
            Delete this {historyType.toLowerCase()}
          </button>
          <button
            className="modal-button"
            onClick={() => setHistoryModal(false)}
          >
            Cancel
          </button>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default History
