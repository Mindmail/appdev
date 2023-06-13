import React from 'react'
import { IoIosAnalytics } from 'react-icons/all'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const YourAffirmations: React.FC<{
  goals: any[]
  handleAffirmation: any
}> = ({ goals, handleAffirmation }) => {
  const navigate = useNavigate()

  return (
    <div className="affirmation-affirmations">
      <p className="bold">Your Affirmations</p>
      <div className="affirmation-affirmations-content">
        {goals.length != 0 &&
          goals.map((item, idx) => {
            return (
              item.id && (
                <div
                  className="affirmation-affirmations-item d-flex align-items-cente"
                  key={item.id}
                >
                  <div className="d-flex align-items-center w-75">
                    <IoIosAnalytics size={32} className="text-primary-color" />
                    <p className="text-secondary-color mb-0 ml-2">
                      {item.caption}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-end w-25">
                    <p className="text-gray-color--1 paragraph float-right">
                      {item.time}
                    </p>
                    <button
                      className="affirmation-affirmations-item-actions ml-2"
                      onClick={() => handleAffirmation(item, idx)}
                    >
                      <HiDotsHorizontal
                        size={20}
                        className="text-primary-color"
                      />
                    </button>
                  </div>
                </div>
              )
            )
          })}
        {goals.length == 0 && (
          <div className="px-5 py-3 text-center">
            <p className="paragraph text-gray-color--1">
              You haven’t had any affirmations yet.
            </p>
            <button
              className="paragraph text-gray-color--5 border-0 bg-transparent"
              onClick={() => navigate('/full-cycle')}
            >
              Want to start it now?
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default YourAffirmations
