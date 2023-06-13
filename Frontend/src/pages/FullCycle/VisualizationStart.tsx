import React, { useCallback } from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import IllustrationMobileImage from '@/assets/images/illustration-mobile.png'
import IllustrationImage from '@/assets/images/illustration.png'
const VisualizationStart: React.FC = () => {
  const navigate = useNavigate()

  const handleVisualization = () => {
    navigate('/full-cycle/visualization')
  }
  const goToDashboard = useCallback(
    () => navigate('/dashboard/home'),
    [history]
  )

  return (
    <div className="container-fluid page-container d-flex flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h3 className="page-title text-secondary-color">
          {isMobile ? (
            'Fantastic! Alexis, you just completed your practice on Gratitude.'
          ) : (
            <>
              Fantastic! Alexis, you just completed your practice on Gratitude.
              <br />
              There is a final practice on Visualization.
            </>
          )}
        </h3>
        {isMobile && (
          <p className="paragraph text-gray-color--1 p-4 text-left">
            There is a final practice on Visualization.
          </p>
        )}
      </div>
      <div className="mx-auto text-center">
        <div className="mb-8 mt-3">
          <img
            src={isMobile ? IllustrationMobileImage : IllustrationImage}
            style={{ width: '100%' }}
            alt=""
          />
        </div>
      </div>
      <div className={`${isMobile ? '' : 'w-50'} mx-auto text-center`}>
        <button
          type="button"
          className={`${
            isMobile ? 'd-block paragraph gobtn' : 'btn-block button-label'
          } btn btn-sm mindmail-button button-primary mx-auto px-4`}
          onClick={handleVisualization}
        >
          {isMobile ? 'Let’s go!' : 'Yes, please, can’t wait!'}
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
          I want to exit from this cycle.
        </button>
      </div>
    </div>
  )
}

export default VisualizationStart
