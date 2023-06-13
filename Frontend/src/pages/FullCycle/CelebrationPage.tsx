import React from 'react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import CelebrationIcon from '@/assets/images/Celebration.png'
const CelebrationPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="container-fluid page-container d-flex flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h3 className="page-title text-secondary-color mb-2">
          Congratulations, Alexis, you just completed your first affirmation
          cycle!
        </h3>
        {isMobile && (
          <p className="label text-gray-color--1">
            Are you ready for practice Gratitude now?
          </p>
        )}
      </div>
      <div
        className={`${isMobile ? 'w-100' : 'w-50'} mx-auto pb-4 text-center`}
      >
        <div className="celebration-icon">
          <img src={CelebrationIcon} alt="" />
        </div>
        <div>
          <div>
            <button
              type="button"
              className={`${
                isMobile ? 'd-block paragraph' : 'btn-block button-label'
              } btn btn-sm mindmail-button button-primary w-100 mx-auto px-4`}
              onClick={() => navigate('/full-cycle/gratitude')}
            >
              {isMobile ? 'Start Gratitude!' : 'Jump into Gratitude!'}
            </button>
          </div>
          <div>
            {isMobile ? (
              <button
                type="button"
                className="btn btn-sm mindmail-button button-link label w-100 mt-3"
                onClick={() => navigate('/dashboard')}
              >
                No, back to dashboard
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-sm btn-block mindmail-button button-outline button-label w-100 mt-3"
                onClick={() => navigate('/dashboard')}
              >
                No thanks, take my back to my dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CelebrationPage
