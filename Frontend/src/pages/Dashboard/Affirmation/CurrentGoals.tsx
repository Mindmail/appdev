import React from 'react'
import { FaPlus } from 'react-icons/fa'

const CurrentGoal: React.FC<{ goals: any; handleAddGoal: any }> = ({
  goals,
  handleAddGoal,
}) => {
  return (
    <div className="affirmation-current-goals">
      <p className="bold">Your Current Goals</p>
      <div className="affirmation-current-goals-buttons d-flex">
        {goals !== null
          ? goals.map(
              (item: any) =>
                item.id && (
                  <button
                    className="btn btn-mindmail btn-mindmail-primary  btn-sm m-1"
                    key={item.id}
                  >
                    {item.type}
                  </button>
                )
            )
          : null}
        <button
          className="btn btn-mindmail btn-mindmail-primary btn-sm m-1"
          onClick={() => handleAddGoal(true)}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default CurrentGoal
