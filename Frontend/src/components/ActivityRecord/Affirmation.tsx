import React, { useState, useEffect } from 'react'
// import { isMobile } from 'react-device-detect'
import { FaClock, FaExchangeAlt, FaPen, FaTrophy } from 'react-icons/all'

import AffirmationWidget from '@/components/AffirmationWidget'

const ProgressAffirmation: React.FC<{ skip?: string; userGoals?: any }> = ({
  // skip,
  userGoals,
}) => {
  const [goalsCreated, setGoalsCreated] = useState(0)
  const [affirmationWritten, setAffirmationWritten] = useState(0)

  useEffect(() => {
    const goalsCreatedFilter = userGoals.filter((item: any) => item.id != null)
    setGoalsCreated(goalsCreatedFilter.length)
    const affirmationWrittenFilter = userGoals.filter(
      (item: any) => item.answer != null
    )
    setAffirmationWritten(affirmationWrittenFilter.length)
  }, [userGoals])

  const affirmationData = [
    {
      count: affirmationWritten,
      icon: <FaPen size={16} />,
      id: 1,
      text: 'Affirmations Written',
    },
    {
      count: userGoals === null || 0,
      icon: <FaExchangeAlt size={16} />,
      id: 2,
      text: 'Negativity Abandoned',
    },
    {
      count: goalsCreated,
      icon: <FaTrophy size={16} />,
      id: 3,
      text: 'Goals Created',
    },
    {
      count: userGoals === null || 0,
      icon: <FaClock size={16} />,
      id: 4,
      text: 'Minutes Practiced',
    },
  ]
  return (
    <div className="affirmation-progress-wrapper">
      <p className="bold">Affirmation</p>
      <div className="affirmation-progress">
        {affirmationData.map((item) => (
          <AffirmationWidget
            icon={item.icon}
            title={item.count}
            text={item.text}
            key={item.id}
          />
        ))}
      </div>
    </div>
  )
}

export default ProgressAffirmation
