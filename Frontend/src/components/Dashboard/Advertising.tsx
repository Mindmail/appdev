import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import ReactDOMServer from 'react-dom/server'
import { useNavigate } from 'react-router-dom'

import AdvertisingMobileSvg from '@/assets/icons/AdvertisingMobileSvg'
import AdvertisingSvg from '@/assets/icons/AdvertisingSvg'
import CirclePlayButton from '@/assets/icons/affirmation/circleplaybutton'
import '@/assets/scss/components/advertising.scss'
import sampleVideo from '@/assets/sample.mp4'
import { apiClientWithToken } from '@/store/apiClient'

// import { isMobile } from 'react-device-detect'

const texts: { [key: string]: string } = {
  Affirmation: `In this video, we will share the concept of Affirmation
  // and how Mindmail can guide you embark your Affirmation journey without getting lost 
  and achieve your goals!`,
  Gratitude: `In this video, we will share the concept of Gratitude 
  and how Mindmail can guide you embark your Affirmation journey without getting lost and archieve your goals!`,
  Mindmail: `You're about to start your Mindmail journey. 
  But first, let's take a look at this video to understand the science behind Mindmail 
  and how Mindmail can help you achieve your goals!`,
  default: `In this video, we will share the concept of Gratitude 
  and how Mindmail can guide you embark your Visualization journey without getting lost and archieve your goals!`,
}

const header: { [key: string]: string } = {
  Affirmation: 'What is Affirmation?',
  Gratitude: 'What is Gratitude?',
  Mindmail: `Welcome to Mindmail 👋`,
}

const Advertising: React.FC<{
  title: string
  description: string
}> = ({ title, description }) => {
  const [affirmationDeleteModal, setAffirmationDeleteModal] = useState(false)
  const [video, setVideo] = useState(sampleVideo)
  const navigate = useNavigate()

  const handleDeleteAffirmation = () => {
    setAffirmationDeleteModal(false)
  }

  const handleAffirmationModal = () => {
    setAffirmationDeleteModal(true)
  }

  useEffect(() => {
    apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .get('/visualization/video/' + description)
      .then((res) => {
        if (res.data.items.length > 0) setVideo(res.data.items[0].videoURL)
        else setVideo(sampleVideo)
      })
      .catch(() => {
        setVideo(sampleVideo)
      })
  }, [])

  const handleLaunch = () => {
    if (description == 'Affirmation') {
      navigate('/full-cycle')
    } else if (description == 'Gratitude') {
      navigate('/full-cycle/gratitude-setting')
    } else if (description == 'Mindmail' || description == 'Visualization') {
      navigate('/full-cycle/visualization')
    }
  }

  const svgString = encodeURIComponent(
    ReactDOMServer.renderToStaticMarkup(<AdvertisingMobileSvg />)
  )

  return (
    <>
      <div className="advertising-border mt-6">
        <div className="row advertising">
          <div
            className="advertising-panel"
            style={{
              background: `url('data:image/svg+xml;utf8, ${svgString}') no-repeat`,
              backgroundPosition: 'center',
            }}
          >
            <h3 className="text-md-left fw-bold mt-2 text-center">
              {
                <>
                  <span className="welcome">Welcome to Mindmail</span>
                  <br />
                </>
              }
              <p className="title mt-2">{title}</p>
            </h3>
            <div
              className="paragraph text-gray-color--1 pt-2
                text-justify text-start"
            >
              <p>
                Many of you struggle with self-doubt and negative thoughts when
                you think about your goals thus it keeps you from moving forward
                in the direction you want to go. Mindmail will help you achieve
                your goal with scientific-based techniques.
              </p>
              <p>Your tool to achieve your goal every time and every day!</p>
            </div>
            <div className="row mt-5">
              <div className="col-12 col-md-6">
                <button
                  className="btn button-primary w-100"
                  onClick={handleLaunch}
                >
                  Launch {description}
                </button>
              </div>
              <div className="col-12 col-md-6 last-button">
                <button
                  className="button-outline btn w-100"
                  onClick={handleAffirmationModal}
                >
                  <CirclePlayButton />
                  <span className="ml-1">See how it works</span>
                </button>
              </div>
            </div>
          </div>

          <div className="svg d-none d-md-block advertising-svg text-center">
            <AdvertisingSvg />
          </div>
        </div>
        <Modal
          show={affirmationDeleteModal}
          onHide={() => setAffirmationDeleteModal(false)}
          centered
          aria-labelledby="contained-modal-title-vcenter"
          className="goal-edit-content-modal"
        >
          <Modal.Header closeButton className="modal-header">
            <Modal.Title className="w-100 text-primary-color sub-title text-center">
              <p>{header[description] || 'What is Visualization?'}</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-content">
            <div>
              <video controls width="100%">
                <source src={video} type="video/mp4" />
                <track kind="captions" />
              </video>
            </div>
            <div className="text-gray-color--1 modal-content-label text-left">
              <p>{texts[description] || texts['default']}</p>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-left modal-footer">
            <div className="modal-btn-desktop">
              <button
                className="btn btn-mindmail btn-mindmail-primary"
                onClick={handleDeleteAffirmation}
                style={{ float: 'right' }}
              >
                Close
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Advertising
