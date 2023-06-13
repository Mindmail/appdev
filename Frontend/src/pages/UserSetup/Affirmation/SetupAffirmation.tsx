import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
// ## import integration module
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux';

import type { AppState } from '@/store'
//
import { getUserGoals, addUserGoal } from '@/store/actions/goals'

import AffirmationGoals from '../../../components/AffirmationGoals'

const SetupAffirmation: React.FC<{ stepper: any; handleNext: any }> = ({
  // children,
  // stepper,
  handleNext,
}) => {
  const dispatch = useDispatch()
  const [effectBtn, setEffectBtn] = useState(true)
  const userGoals = useSelector((state: AppState) => state.goals.userGoals)

  useEffect(() => {
    getUserGoals(dispatch)
  }, [])

  useEffect(() => {
    const filter = userGoals.filter((item) => {
      return item.selected
    })
    if (filter.length !== 0) {
      setEffectBtn(false)
    } else {
      setEffectBtn(true)
    }
  }, [userGoals])

  const handleNextClick = () => {
    userGoals.forEach((item) => {
      if (item.selected) {
        addUserGoal(item, dispatch)
      }
    })
    handleNext()
  }

  const handleGoals = (idx: any) => {
    const newState = userGoals.map((item) => {
      if (item.goalId === idx) {
        item.selected = !item.selected
      }
      return item
    })
    const filter = newState.filter((item) => {
      return item.selected === true
    })

    if (filter.length !== 0) {
      setEffectBtn(false)
    } else {
      setEffectBtn(true)
    }

    dispatch({
      payload: newState,
      type: 'GET_GOALS',
    })
  }

  return (
    <div className="affirmation-setup-wrapper text-center">
      <h3 className="page-title text-secondary-color">
        Hello Alexis, what are your goals?
      </h3>
      <p
        className={
          'text-gray-color--1 my-4' + (isMobile ? ' label ' : ' paragraph ')
        }
      >
        Take moment to think about what are the goals that you want achieve?
      </p>
      <AffirmationGoals goals={userGoals} handleGoals={handleGoals} />
      <button
        type="button"
        className="btn btn-sm btn-block mindmail-button button-primary button-label mt-4"
        onClick={handleNextClick}
        disabled={effectBtn}
      >
        Ok, I set up the goal!
      </button>
      <div className="mt-2 text-center">
        <Link
          className="text-primary-color button-label underlined cursor-pointer"
          to="/dashboard/home/skip-affirmation"
        >
          I will skip the set up
        </Link>
      </div>
    </div>
  )
}

export default SetupAffirmation
