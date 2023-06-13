import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
// import { IoMdSend, IoIosExpand, HiMinus, FaTimes } from 'react-icons/all';
import '@/assets/scss/components/affirmation-chat.scss'
import { isMobile } from 'react-device-detect'
import { IoMdSend, IoIosExpand, FaTimes } from 'react-icons/all'
import { FaLock, FaInfoCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import Tooltip from '@/components/Tooltip'

const AffirmationChat: React.FC<{
  stepper?: any
  handleNext?: any
  control?: any
  handleState?: any
  dashboard?: any
  children?: React.ReactNode
  handleChat?: any
}> = ({
  children,
  // stepper,
  handleNext,
  control,
  handleState,
  dashboard = true,
  handleChat,
}) => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [maximize, setMaximize] = useState(false)

  const handleMaximize = (action: number) => {
    if (action == 1) {
      document.body.style.overflow = 'visible'
      handleState(1)
    } else if (action == 2) {
      if (maximize) {
        document.body.style.overflow = 'visible'
      } else {
        document.body.style.overflow = 'hidden'
      }
      setMaximize(!maximize)
    } else if (action == 3) {
      document.body.style.overflow = 'visible'
      handleState(0)
    } else {
      document.body.style.overflow = 'visible'
      navigate('/complete-affirmation')
    }
  }

  const handleSubmitChat = () => {
    if (text) {
      handleChat('you', text)
      setText('')
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.keyCode == 13) {
      handleSubmitChat()
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  return (
    <Card
      className={`chat-box bg-white ${maximize ? 'maximize' : ''} ${
        control ? 'h-100' : ''
      }`}
    >
      <Card.Header className="bg-gray-color--3 d-flex align-items-center flex-row p-4">
        {(!control || (control && maximize)) && (
          <div className="w-100 d-flex align-items-center chat-header mb-auto mt-auto flex-wrap">
            <div
              // className={`d-flex align-items-center ${
              //   dashboard ? 'w-75' : ''
              // } justify-content-start`}
              className={`d-flex align-items-center justify-content-start`}
            >
              <span className="d-flex justify-content-center align-items-center bg-primary-color small-circle text-center">
                <FaLock className="text-gray-color--3 ml-auto mr-auto" />
              </span>
              <p className="button-label black-color mx-3 mb-0 mr-10">
                Your Affirmation Chat:
              </p>
              {isMobile && !dashboard && (
                <div className="w-auto">
                  <Tooltip
                    icon={<FaInfoCircle size="24" />}
                    text="Based on scientific research, an affirmation can work very well when people not only say the affirmation in present tense but also share their affirmations in conversation."
                  />
                </div>
              )}
            </div>
            {!isMobile ? (
              <>
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    className="btn btn-sm button-label mindmail-button button-primary mr-2"
                    onClick={handleNext}
                  >
                    Work
                  </button>
                  <button
                    className="btn btn-sm button-label mindmail-button button-outline"
                    onClick={handleNext}
                  >
                    Relationship
                  </button>
                  <span className="d-inline-block tooltip-icon ml-3">
                    <Tooltip
                      icon={<FaInfoCircle size="24" />}
                      text="Based on scientific research, an affirmation can work very well when people not only say the affirmation in present tense but also share their affirmations in conversation."
                    />
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-left">
                  <button
                    className="btn btn-sm button-label mindmail-button button-primary mr-2"
                    onClick={handleNext}
                  >
                    Work
                  </button>
                  <button
                    className="btn btn-sm button-label mindmail-button button-outline"
                    onClick={handleNext}
                  >
                    Relationship
                  </button>
                </div>
                <span className="d-inline-block tooltip-icon ml-3">
                  <Tooltip
                    icon={<FaInfoCircle size="24" />}
                    text="Based on scientific research, an affirmation can work very well when people not only say the affirmation in present tense but also share their affirmations in conversation."
                  />
                </span>
              </>
            )}
          </div>
        )}
        {control && (
          <div className="w-100 d-flex align-items-center mb-auto mt-auto flex-row-reverse flex-wrap">
            <div className="chat-actions">
              <button
                className="btn btn-sm button-label mindmail-button mr-1"
                onClick={() => handleMaximize(1)}
              >
                {/* <HiMinus size={24} /> */}
              </button>
              <button
                className="btn btn-sm button-label mindmail-button mr-1"
                onClick={() => handleMaximize(2)}
              >
                <IoIosExpand size={24} />
              </button>
              <button
                className="btn btn-sm button-label mindmail-button"
                onClick={() => handleMaximize(3)}
              >
                <FaTimes size={24} />
              </button>
            </div>
          </div>
        )}
      </Card.Header>
      <Card.Body
        className={`position-relative w-100  ${isMobile ? 'p-4' : ''}`}
      >
        {/* <div className={`${isMobile ? '' : 'w-75'} ml-auto mr-auto`}> */}
        <div className={`ml-auto mr-auto`}>
          <p className="paragraph text-gray-color--1 text-center">10:25PM</p>
          <p
            className={`text-gray-color--1 w-75 text-center ${
              control && maximize ? 'paragraph' : 'label'
            }`}
          >
            This is your safe place with your Zen-bud to practice affirmations
            and reach your goals! All the conversations here are private and
            secure. We sync all your affirmation practices in our private cloud.
            You can save or delete your affirmations later on the settings.
          </p>
        </div>
        <div className={`d-flex flex-column chat-text-content margin-top-lg`}>
          <div className={`${isMobile ? '' : 'w-25'} ml-8`}>
            <p className="label text-secondary-color">
              <strong className="text-gray-color--1">Abby</strong> &nbsp;
              07:00AM
            </p>
          </div>
          <div className="d-flex flex-row">
            <div className="d-flex flex-column margin-bottom-sm w-100">
              {children}
            </div>
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="bg-transparent" style={{ border: 'none' }}>
        <div className="position-relative">
          <Form.Control
            type="text"
            className="send-message-input"
            placeholder="Reply your thoughts"
            onKeyDown={handleKey}
            value={text}
            onChange={handleChange}
          />
          <button
            className="btn send-button"
            onClick={() => (control ? handleMaximize(4) : handleSubmitChat())}
          >
            <IoMdSend />
          </button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default AffirmationChat
