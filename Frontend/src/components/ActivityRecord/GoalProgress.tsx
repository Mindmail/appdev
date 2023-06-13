import React, { useEffect, useState } from 'react'
import { Modal, ProgressBar, Form } from 'react-bootstrap'
import { FaInfoCircle, FaStar } from 'react-icons/fa'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// import FinanceIcon from '@/assets/icons/affirmation/FinanceIcon'
// import HealthIcon from '@/assets/icons/affirmation/HealthIcon'
// import LifeIcon from '@/assets/icons/affirmation/LifeIcon'
// import MindfulnessIcon from '@/assets/icons/affirmation/MindfulnessIcon'
// import RelationshipIcon from '@/assets/icons/affirmation/RelationshipIcon'
// import WorkIcon from '@/assets/icons/affirmation/WorkIcon'
import AffirmationGoals from '@/components/AffirmationGoals'
import Tooltip from '@/components/Tooltip'
import type { GoalType } from '@/global.types'
//
import {
  getUserGoals,
  addUserGoal,
  removeUserGoal,
  updateUserGoal,
} from '@/store/actions/goals'

const GoalProgress: React.FC<{ skip?: string; userGoals?: any }> = ({
  // skip,
  userGoals,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [goalModal, setGoalModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [goalEditSelected, setGoalEditSelected] = useState<GoalType>()
  const [addGoalModal, setAddGoalModal] = useState(false)
  // const [goals, setGoals] = useState<GoalType[]>([])

  useEffect(() => {
    getUserGoals(dispatch)
  }, [])

  const handleGoal = (item: any) => {
    setGoalEditSelected(item)
    setGoalModal(true)
  }
  const handleModal = (state: boolean) => {
    setGoalModal(false)
    if (state) {
      setEditModal(true)
    }
  }
  const handleEditGoal = () => {
    if (goalEditSelected) updateUserGoal(goalEditSelected, dispatch)
    setEditModal(false)
  }
  const launchGoal = () => {
    navigate('/launch-goal')
  }

  const handleGoals = (idx: any) => {
    const newState = userGoals.map((item: any) => {
      if (item.goalId === idx) {
        item.selected = !item.selected
      }
      return item
    })

    dispatch({
      payload: newState,
      type: 'GET_GOALS',
    })
  }

  const handleAddGoal = async () => {
    if (userGoals.length > 0) {
      const addfilter = await userGoals.filter(
        (item: any) => item.id == null && item.selected
      )
      const removefilter = await userGoals.filter(
        (item: any) => item.id && item.selected == false
      )

      addfilter.map((item: any) => {
        addUserGoal(item, dispatch)
      })

      removefilter.map((item: any) => {
        removeUserGoal(item, dispatch)
      })
    }

    setAddGoalModal(false)
  }

  const onGoalEdit: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const goal = goalEditSelected
    if (goal != undefined) goal.caption = e.target.value
    setGoalEditSelected(goal)
  }

  return (
    <>
      <div className="goal-progress-wrapper">
        <p className="text-secondary-color bold">Your Goal Progress</p>
        {userGoals.filter((item: any) => (item.id > 0 ? item : '')).length ===
        0 ? (
          <div className="goal-progress pb-2 pl-4 pr-4 pt-2">
            <p className="text-gray-color--1 m-0 mb-1 text-center">
              You haven’t created your goals yet.
            </p>
            <div className="text-center">
              <button
                className="bg-background underlined text-gray-color--5 m-0 cursor-pointer border-0 text-center "
                onClick={() => setAddGoalModal(true)}
              >
                Wanna give it a try?
              </button>
            </div>
          </div>
        ) : (
          <div className="goal-progress">
            <div className="goal-progress-buttons">
              {userGoals.length &&
                userGoals.map(
                  (item: GoalType, index: number) =>
                    item.id && (
                      <button
                        key={index}
                        type="button"
                        className="btn btn-sm btn-mindmail btn-mindmail-primary font-weight-500"
                        onClick={() => {}}
                      >
                        {item.type}
                      </button>
                    )
                )}
            </div>
            <span className="divider" />
            <div className="goal-items">
              {userGoals.map((item: GoalType, idx: number) => {
                const answer = JSON.parse(item.answer)
                const question = JSON.parse(item.question)
                return (
                  item.id && (
                    <div className="goal-item" key={idx}>
                      <div className="goal-progress-item">
                        <div className="goal-progress-header">
                          <FaStar
                            size={16}
                            color={
                              idx == 0
                                ? '#F200A0'
                                : idx == 1
                                ? '#FCBA00'
                                : '1FD0b9'
                            }
                          />
                          <span>"{item.caption}"</span>
                        </div>
                        <div className="goal-progressbar text-gray-color--1">
                          <ProgressBar
                            now={
                              !question || question.length - 1 <= 0
                                ? 100
                                : answer
                                ? (answer.length * 100) /
                                  Math.round((question.length - 1) / 2)
                                : 0
                            }
                          />
                          <span>
                            {!answer || answer.length == 0 ? 0 : answer.length}/
                            {!question || question.length == 0
                              ? 0
                              : Math.round((question.length - 1) / 2)}
                          </span>
                        </div>
                      </div>
                      <div className="goal-info">
                        <Tooltip
                          icon={<FaInfoCircle size="24" />}
                          text={item.type}
                          position="right"
                        />
                      </div>
                      <button
                        className="goal-actions border-0 bg-transparent"
                        onClick={() => handleGoal(item)}
                      >
                        <HiDotsHorizontal
                          size={20}
                          className="font-color-primary"
                        />
                      </button>
                    </div>
                  )
                )
              })}
            </div>
            {/*  */}
          </div>
        )}
      </div>
      <Modal
        show={goalModal}
        onHide={() => setGoalModal(false)}
        centered
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        className="goal-edit-modal"
      >
        <Modal.Body>
          <button
            className="border-0modal-button bg-transparent"
            onClick={() => launchGoal()}
          >
            Launch this goal's affirmation
          </button>
          <button
            className="border-0modal-button bg-transparent"
            onClick={() => handleModal(true)}
          >
            Edit this goal
          </button>
          <button
            className="border-0modal-button bg-transparent"
            onClick={() => handleModal(false)}
          >
            Cancel
          </button>
        </Modal.Body>
      </Modal>
      <Modal
        show={editModal}
        onHide={() => setEditModal(false)}
        centered
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="goal-edit-content-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary-color">
            Edit the goal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            className="bg-gray-color--3 text-secondary-color"
            as="textarea"
            rows={3}
            defaultValue={
              goalEditSelected != null ? goalEditSelected.caption : ''
            }
            onChange={onGoalEdit}
          />
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button
            className="btn btn-mindmail button-secondary w-25"
            // onClick={() => handleEditGoal(false)}
            onClick={() => handleEditGoal()}
          >
            Cancel
          </button>
          <button
            className="btn btn-mindmail button-primary w-25"
            // onClick={() => handleEditGoal(true)}
            onClick={() => handleEditGoal()}
          >
            Complete the edit
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={addGoalModal}
        onHide={() => setAddGoalModal(false)}
        centered
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="affirmations-add-goal-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">
            Select More Goals to Achieve
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AffirmationGoals goals={userGoals} handleGoals={handleGoals} />
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-top-0">
          <button
            className="btn btn-mindmail btn-mindmail-secondary"
            onClick={() => setAddGoalModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-mindmail btn-mindmail-primary"
            onClick={() => handleAddGoal()}
          >
            Yay! Add my new goals
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default GoalProgress
