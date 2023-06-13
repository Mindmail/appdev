import React, { useCallback } from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router'

import CelebrationIcon from '@/assets/images/Celebration.png'

const AllSet: React.FC = () => {
  const navigate = useNavigate()

  const handleFullCycle = useCallback(() => navigate('/full-cycle'), [history])
  const handleDashboard = useCallback(() => navigate('/dashboard'), [history])
  return (
    <div className="container-fluid page-container d-flex flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h3 className="page-title text-secondary-color pl-2 pr-2">
          {isMobile
            ? 'Congratulations, Alexis, you all set!'
            : 'Congratulations, Alexis you all set! Welcome to Mindmail, officially!'}
        </h3>
        <p className="paragraph text-gray-color--1 mt-4">
          Your mind training journey starts off on a powerful move. We recommend
          jumping into your first Mindmail Cycle now. If you’re not quite ready,
          feel free to go to Dashboard.
        </p>
      </div>
      <div className="w-50 mx-auto text-center">
        <div className="celebration-icon">
          <img src={CelebrationIcon} alt="" />
        </div>
        <button
          type="button"
          className="btn btn-sm btn-block mindmail-button button-primary button-label mt-5"
          onClick={handleFullCycle}
        >
          {isMobile
            ? 'Start now'
            : 'Yes! I want to do my first Mindmail Cycle now!'}
        </button>
        <button
          type="button"
          className={`btn btn-sm mindmail-button ${
            isMobile ? 'button-link' : 'button-outline  btn-block'
          } button-label mt-3`}
          onClick={handleDashboard}
        >
          {isMobile
            ? 'I will skip now'
            : 'I’m not ready, take me to my Dashboard'}
        </button>
      </div>
    </div>
  )
}

export default AllSet
