import React from 'react'
import { isMobile } from 'react-device-detect'
import { Link, useNavigate } from 'react-router-dom'

import ProcessesCircleSvg from '../../../assets/icons/ProcessesCircleSvg'

const IntroSetup: React.FC = () => {
  const navigate = useNavigate()

  const handleGoAffirmation = () => {
    navigate('/setup/affirmation')
  }
  return (
    <div className="page-container d-flex justify-content-center align-items-center container">
      <div className="w-100 text-center">
        <h4 className="page-title w-75 text-secondary-color mx-auto ml-auto mr-auto">
          You're about to set up your Mindmail journey.
        </h4>
        <p
          className={
            'text-gray-color--1 my-5 ml-auto mr-auto text-left' +
            (isMobile
              ? ' label '
              : ' paragraph text-justify-last-center w-65 mx-auto')
          }
        >
          Mindmail is a mind training journey that is designed to help you
          harness your imagination power to see evidence within the mind before
          the evidence exists in reality. Your Mindmail training consists of
          three processes: affirmation, gratitude, and visualization. And of
          course, repetition is the key to reinforce!
        </p>
        <div className="w-100 d-flex justify-content-center margin-bottom-lg margin-top-lg flex-row">
          <ProcessesCircleSvg />
        </div>
        <div className="w-50 buttons mx-auto ml-auto mr-auto p-4">
          <button
            type="button"
            className="btn btn-sm btn-block mindmail-button button-primary button-label w-100"
            onClick={handleGoAffirmation}
          >
            Let's do it
          </button>
          <div className="w-100 mt-2 text-center">
            <Link
              className="button-label text-primary-color underlined cursor-pointer"
              to="/dashboard/home/skip-intro"
            >
              I will skip the set up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroSetup
