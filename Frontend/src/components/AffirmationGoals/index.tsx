import React from 'react'

import '@/assets/scss/components/affirmation-goals.scss'
import FinanceIcon from '@/assets/icons/affirmation/FinanceIcon'
import HealthIcon from '@/assets/icons/affirmation/HealthIcon'
import LifeIcon from '@/assets/icons/affirmation/LifeIcon'
import MindfulnessIcon from '@/assets/icons/affirmation/MindfulnessIcon'
import RelationshipIcon from '@/assets/icons/affirmation/RelationshipIcon'
import WorkIcon from '@/assets/icons/affirmation/WorkIcon'

const AffirmationGoals: React.FC<{
  goals: any[]
  handleGoals: any
}> = ({ goals, handleGoals }) => {
  return (
    <div className="affirmation-goals">
      {goals.map((item) => (
        <div className="card-wrapper" key={item.goalId}>
          <button
            className="card border-0 bg-transparent"
            key={item.goalId}
            onClick={() => handleGoals(item.goalId)}
          >
            <input
              type="checkbox"
              className="goal-checkbox"
              id={item.type}
              checked={item.selected != null && item.selected}
              onChange={() => handleGoals(item.goalId)}
            />
            <label className="text-center" htmlFor={item.type}>
              {item.type == 'Work' ? (
                <WorkIcon />
              ) : item.type == 'Relationship' ? (
                <RelationshipIcon />
              ) : item.type == 'Finance' ? (
                <FinanceIcon />
              ) : item.type == 'Health' ? (
                <HealthIcon />
              ) : item.type == 'Mindfulness' ? (
                <MindfulnessIcon />
              ) : item.type == 'Life' ? (
                <LifeIcon />
              ) : (
                ''
              )}
              <span className="d-block label pt-2">{item.type}</span>
            </label>
          </button>
        </div>
      ))}
    </div>
  )
}
export default AffirmationGoals
