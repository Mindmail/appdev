import React from 'react'
import { useNavigate } from 'react-router-dom'

import CelebrationIcon from '@/assets/images/Celebration.png'
const AffirmationComplete: React.FC = () => {
  const navigate = useNavigate()

  const handleGratitude = () => {
    navigate('/dashboard/gratitude')
  }
  const handleBack = () => {
    navigate('/dashboard/affirmation')
  }

  return (
    <div className="container-fluid page-container d-flex flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h3 className="page-title text-primary-color">
          Congratulations, Alexis, you just completed your first affirmation
          cycle!
          <br />
          Are you ready for practice Gratitude now?
        </h3>
      </div>
      <div className="w-50 mx-auto text-center">
        <div className="celebration-icon">
          <img src={CelebrationIcon} alt="" />
        </div>
        <button
          type="button"
          className="btn btn-sm btn-block mindmail-button button-primary button-label mt-5"
          onClick={handleGratitude}
        >
          Jump into Gratitude!
        </button>
        <button
          type="button"
          className="btn btn-sm btn-block mindmail-button button-outline button-label mt-3"
          onClick={handleBack}
        >
          No thanks, take my back to my dashboard
        </button>
      </div>
    </div>
  )
}

export default AffirmationComplete
