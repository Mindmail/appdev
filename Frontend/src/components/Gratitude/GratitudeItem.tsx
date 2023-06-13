import React, { useState, useCallback } from 'react'
import Card from 'react-bootstrap/Card'
import { isMobile } from 'react-device-detect'
import '@/assets/scss/components/gratitude-item.scss'
import {
  IoIosMusicalNotes,
  IoCloseOutline,
  // MdPauseCircleFilled,
  MdPlayCircleFilled,
  RiPencilFill,
} from 'react-icons/all'
import { useNavigate } from 'react-router-dom'

import { apiClientWithToken } from '@/store/apiClient'

// import '@/assets/scss/components/gratitude-item.scss';

const GratitudeItem: React.FC<{
  stepper?: any
  item?: any
  handleNext?: any
}> = ({ item, handleNext }) => {
  const [gratitudeContent, setGratitudeContent] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const handleGratitudeContent = (e: any) => {
    setError(false)
    setGratitudeContent(e.target.value)
  }
  const goToDashboard = useCallback(
    () => navigate('/dashboard/visualization'),
    [history]
  )
  const handleNextStep = async () => {
    if (gratitudeContent.length) {
      await apiClientWithToken(localStorage.getItem('mindmailtoken'))
        .put('/visualization/image/' + item.id, {
          description: gratitudeContent,
        })
        .then(() => {
          handleNext()
        })
        .catch((err) => {
          if (err.response === undefined) {
            // console.log('something went wrong')
          } else {
            // console.log(err.response.data)
          }
        })
    } else {
      setError(true)
    }
  }

  return (
    <Card className="gratitude-item-wrapper">
      <Card.Img variant="top" src={item.photo} />
      <Card.Body
        className={`${isMobile ? 'p-0 ' : ''} 'position-relative w-100`}
      >
        <Card.Title className="gratitude-meta d-flex justify-content-between mb-5 ml-10 mr-10 mt-5">
          <IoIosMusicalNotes size={22} />
          <p className="label mx-3 mb-0">{item.title}</p>
          <p className="label mx-3 mb-0">{item.timeFrame}</p>
          <MdPlayCircleFilled size={22} />
        </Card.Title>
        <Card.Text className="gratitude-content">
          <textarea
            name="gratitudeContent"
            id={`gratitudeContent${item.id}`}
            className="label"
            onChange={(e) => handleGratitudeContent(e)}
            value={gratitudeContent}
            required
          ></textarea>
          {(!gratitudeContent || !gratitudeContent.length) && (
            <label
              htmlFor={`gratitudeContent${item.id}`}
              className="placeholder label"
            >
              <RiPencilFill size={16} />
              &nbsp; Write down your appreciations here in 120 characters.
            </label>
          )}
          {error && (
            <div className="error-message">
              <IoCloseOutline size={20} onClick={() => setError(false)} />
              Oops.. seems like you haven't entered your writing yet.
            </div>
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <button
          className={`${
            isMobile ? 'd-block paragraph nextbtn' : 'btn-block button-label'
          } btn btn-sm mindmail-button button-primary mx-auto px-4`}
          disabled={error}
          onClick={handleNextStep}
        >
          Next
        </button>
        <button
          type="button"
          className={`${
            isMobile
              ? 'd-block label button-link mx-auto'
              : 'btn-block button-label button-outline'
          } btn btn-sm mindmail-button mt-3`}
          onClick={goToDashboard}
        >
          I want to exit from this practice.
        </button>
      </Card.Footer>
    </Card>
  )
}

export default GratitudeItem
