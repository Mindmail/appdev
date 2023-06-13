import React from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import CelebrationIcon from '@/assets/images/Celebration.png'
const CelebrationPage1: React.FC = () => {
  const navigate = useNavigate()

  const handleAgain = () => {
    navigate('/full-cycle')
  }
  const handleDashboard = () => {
    navigate('/dashboard/visualization')
  }
  return (
    <div className="container-fluid page-container d-flex flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h3 className="page-title justimargin text-secondary-color">
          Congratulations, Alexis, you just completed your first Mindmail cycle!
        </h3>

        <p
          className={`text-center ${
            isMobile ? 'label' : 'paragraph'
          } text-gray-color--1`}
        >
          All of your affirmations, feelings of gratitude, and visualizations
          will be embedding themselves into your subconscious right now! With
          repetition,
          <br /> the feelings that you activated throughout the process will
          become enhanced and second nature to you. Enjoy the ride!
        </p>
      </div>
      <div className="w-50 mx-auto py-5 text-center">
        <div className="celebration-icon">
          <img src={CelebrationIcon} alt="" />
        </div>
        <button
          type="button"
          className={`${
            isMobile ? 'd-block paragraph' : 'btn-block button-label'
          } btn btn-sm mindmail-button button-primary mx-auto px-4`}
          onClick={handleAgain}
        >
          {isMobile ? 'I want to do again' : 'Let’s go again!'}
        </button>
        {isMobile ? (
          <button
            type="button"
            className="btn btn-sm mindmail-button button-link label mt-3"
            onClick={handleDashboard}
          >
            I want to exit from this cycle
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-sm btn-block mindmail-button button-outline button-label mt-3"
            onClick={handleDashboard}
          >
            I’m feeling good, take my back to my dashboard
          </button>
        )}
      </div>
    </div>
  )
}

export default CelebrationPage1
