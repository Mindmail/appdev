import React, { useCallback } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'

import AffirmationChat from '@/components/AffirmationChat'

const LaunchGoal: React.FC = () => {
  const navigate = useNavigate()

  const handleNextClick = useCallback(
    () => navigate('/dashboard/home'),
    [history]
  )

  return (
    <div className="container-fluid dashboard-page-container d-flex flex-column justify-content-between launch-goal">
      <AffirmationChat handleNext={handleNextClick}>
        <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
          Hello Alexis, nice to meet you! I am R2-D2. Your personal affirmation
          zen-bud!
        </Alert>
        <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
          I noticed that you have "Work" and "Relationship" related goals you
          want to achieve. I suggest we started on "Work" first so you can
          prioritize your goals in more efficient way
          <span role="img" aria-label="img">
            👍
          </span>
        </Alert>
        <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
          Now, can you type out the "work goals" that you have in minds?
        </Alert>
      </AffirmationChat>
    </div>
  )
}

export default LaunchGoal
