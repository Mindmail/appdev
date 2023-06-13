import React from 'react'
// import { isMobile } from 'react-device-detect'
import { FaCamera, FaHeart, FaPlay, FaVideo } from 'react-icons/all'

import AffirmationWidget from '@/components/AffirmationWidget'

const ProgressAffirmation: React.FC<{ skip?: string; userGoals?: any }> = ({
  // skip,
  userGoals,
}) => {
  const gratitudeData = [
    {
      count: userGoals === null || 0,
      icon: <FaHeart size={16} />,
      id: 1,
      text: 'Gratitude Exercised',
    },
    {
      count: userGoals === null || 0,
      icon: <FaCamera size={16} />,
      id: 2,
      text: 'Photos Uploaded',
    },
    {
      count: userGoals === null || 0,
      icon: <FaVideo size={16} />,
      id: 3,
      text: 'Video Uploaded',
    },
  ]
  const visualizationData = {
    count: userGoals === null || 0,
    icon: <FaPlay size={16} />,
    id: 1,
    text: 'Visualization Exercised',
  }
  return (
    <div className="gratitude-visualization-wrapper">
      <div className="gratitude-wrapper">
        <p className="text-secondary-color bold">Gratitude</p>
        <div className="affirmation-progress">
          {gratitudeData.map((item) => (
            <AffirmationWidget
              icon={item.icon}
              title={1}
              text={item.text}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <div className="visualization-wrapper">
        <p className="text-secondary-color bold">Visualization</p>
        <div className="affirmation-progress">
          <AffirmationWidget
            icon={visualizationData.icon}
            title={1}
            text={visualizationData.text}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressAffirmation
