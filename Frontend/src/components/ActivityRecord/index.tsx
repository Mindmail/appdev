import React from 'react'

import type { GoalType } from '@/global.types'

import ProgressAffirmation from './Affirmation'
import GoalProgress from './GoalProgress'
import GratitudeAndVisualization from './GratitudeAndVisualization'

type ActivityRecordTypes = {
  userGoals: GoalType[]
  skip: string
}

const ActivityRecord: React.FC<ActivityRecordTypes> = ({ userGoals, skip }) => {
  return (
    <>
      <GoalProgress skip={skip} userGoals={userGoals} />
      <ProgressAffirmation skip={skip} userGoals={userGoals} />
      <GratitudeAndVisualization skip={skip} userGoals={userGoals} />
    </>
  )
}

export default ActivityRecord
