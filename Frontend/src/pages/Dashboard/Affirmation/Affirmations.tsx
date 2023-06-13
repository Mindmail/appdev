import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
// import { isMobile } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// import Image1 from '@/assets/images/slidingImage1.png'

// import FinanceIcon from '@/assets/icons/affirmation/FinanceIcon'

import '@/assets/scss/pages/dashboard/affirmation.scss'

// import HealthIcon from '@/assets/icons/affirmation/HealthIcon'
// import LifeIcon from '@/assets/icons/affirmation/LifeIcon'
// import MindfulnessIcon from '@/assets/icons/affirmation/MindfulnessIcon'
// import RelationshipIcon from '@/assets/icons/affirmation/RelationshipIcon'
// import WorkIcon from '@/assets/icons/affirmation/WorkIcon'
import AffirmationGoals from '@/components/AffirmationGoals'
// import UserAvatar from '@/components/Dashboard/UserAvatar'
import Advertising from '@/components/Dashboard/Advertising'
import type { GoalType } from '@/global.types'
import type { AppState } from '@/store'
import {
  getUserGoals,
  addUserGoal,
  removeUserGoal,
  updateUserGoal,
} from '@/store/actions/goals'

import DashboardLayout from '../Layout/DashboardLayout'
import TopBar from '../Layout/TopBar'

import CurrentGoal from './CurrentGoals'
import DashboardAffirmationChat from './DashboardAffirmationChat'
import YourAffirmations from './YourAffirmations'
//

const Affirmations: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userGoals = useSelector((state: AppState) => state.goals.userGoals)

  const [addGoalModal, setAddGoalModal] = useState(false)
  const [affirmationModal, setAffirmationModal] = useState(false)
  const [affirmationEditModal, setAffirmationEditModal] = useState(false)
  const [affirmationDeleteModal, setAffirmationDeleteModal] = useState(false)
  const [affirmationClicked, setAffirmationClicked] = useState<GoalType>()
  const [affirmationEditSelected, setAffirmationEditSelected] =
    useState<GoalType>()
  const [affirmationChat, setAffirmationChat] = useState(0)

  useEffect(() => {
    getUserGoals(dispatch)
  }, [])

  const handleAddGoal = async () => {
    if (userGoals.length > 0) {
      const addfilter = await userGoals.filter(
        (item) => item.id == null && item.selected
      )
      const removefilter = await userGoals.filter(
        (item) => item.id && item.selected == false
      )

      addfilter.map((item) => {
        addUserGoal(item, dispatch)
      })

      removefilter.map((item) => {
        removeUserGoal(item, dispatch)
      })
    }

    setAddGoalModal(false)
  }

  const handleAffirmation = (item: any) => {
    setAffirmationClicked(item)
    setAffirmationModal(true)
  }

  const handleGoals = (idx: any) => {
    const newState = userGoals.map((item) => {
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

  const handleAffirmationModal = (state: number) => {
    setAffirmationModal(false)
    setAffirmationEditSelected(affirmationClicked)
    if (state == 1) {
      navigate('/launch-affirmation')
      setAffirmationChat(2)
    } else if (state == 2) {
      setAffirmationEditModal(true)
    } else if (state == 3) {
      setAffirmationDeleteModal(true)
    }
  }

  const handleAffirmationEditComplete = () => {
    // console.log('affirmationEditSelected', affirmationEditSelected)
    if (affirmationEditSelected)
      updateUserGoal(affirmationEditSelected, dispatch)
    setAffirmationEditModal(false)
  }

  const handleDeleteAffirmation = () => {
    if (affirmationDeleteModal)
      removeUserGoal(affirmationEditSelected, dispatch)
    setAffirmationDeleteModal(false)
  }

  const onAffirmationEdit: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const affirmation = affirmationEditSelected
    if (affirmation != undefined) affirmation.caption = e.target.value
    setAffirmationEditSelected(affirmation)
  }

  return (
    <>
      <DashboardLayout
        sideComponent={
          <>
            <CurrentGoal goals={userGoals} handleAddGoal={setAddGoalModal} />
            <YourAffirmations
              goals={userGoals}
              handleAffirmation={handleAffirmation}
            />
          </>
        }
      >
        <TopBar
          title="Affirmation"
          description="Affirmation is all about writing the goals in the present tense. Stay Present, Stay Real :)"
          tooltip="Based on scientific research, an affirmation can
                  work very well when people not only say the
                  affirmation in present tense but also share their
                  affirmations in conversation."
        />
        {(affirmationChat == 0 || affirmationChat == 1) && (
          <Advertising title="Affirmation Practice" description="Affirmation" />
        )}
        <div className="mobile-dashboard mt-5">
          <CurrentGoal goals={userGoals} handleAddGoal={setAddGoalModal} />
        </div>
        <div className="mobile-dashboard mt-1">
          <YourAffirmations
            goals={userGoals}
            handleAffirmation={handleAffirmation}
          />
        </div>
        {affirmationChat == 2 && (
          <div className="mt-2">
            <DashboardAffirmationChat
              selectedGoal={affirmationEditSelected}
              setAffirmationChat={setAffirmationChat}
            />
          </div>
        )}
      </DashboardLayout>
      <Modal
        show={addGoalModal}
        onHide={() => setAddGoalModal(false)}
        centered
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="affirmations-add-goal-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 big-sub-title text-primary-color text-center">
            Select More Goals to Achieve
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AffirmationGoals goals={userGoals} handleGoals={handleGoals} />
        </Modal.Body>
        <Modal.Footer className="justify-content-center border-top-0">
          <button
            className="btn btn-mindmail btn-mindmail-secondary button-label"
            onClick={() => setAddGoalModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-mindmail btn-mindmail-primary button-label"
            onClick={() => handleAddGoal()}
          >
            Yay! Add my new goals
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={affirmationModal}
        onHide={() => setAffirmationModal(false)}
        centered
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        className="affirmation-edit-modal"
      >
        <Modal.Body>
          <button
            className="modal-button button-label"
            onClick={() => handleAffirmationModal(1)}
          >
            Launch this affirmation
          </button>
          <button
            className="modal-button button-label"
            onClick={() => handleAffirmationModal(2)}
          >
            Edit this affirmation
          </button>
          <button
            className="modal-button button-label"
            onClick={() => handleAffirmationModal(3)}
          >
            Delete this affirmation
          </button>
          <button
            className="modal-button button-label"
            onClick={() => setAffirmationModal(false)}
          >
            Cancel
          </button>
        </Modal.Body>
      </Modal>

      <Modal
        show={affirmationEditModal}
        onHide={() => setAffirmationEditModal(false)}
        centered
        aria-labelledby="contained-modal-title-vcenter"
        className="goal-edit-content-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-primary-color big-sub-title text-center">
            Edit the affirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            className="text-secondary-color sub-title bold"
            rows={3}
            defaultValue={
              affirmationEditSelected != null
                ? affirmationEditSelected.caption
                : ''
            }
            onChange={onAffirmationEdit}
          />
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button
            className="btn btn-mindmail btn-mindmail-secondary button-label"
            onClick={() => setAffirmationEditModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-mindmail btn-mindmail-primary button-label"
            onClick={handleAffirmationEditComplete}
          >
            Complete the edit
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={affirmationDeleteModal}
        onHide={() => setAffirmationDeleteModal(false)}
        centered
        aria-labelledby="contained-modal-title-vcenter"
        className="goal-edit-content-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-primary-color big-sub-title text-center">
            Delete this affirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-secondary-color sub-title p-3">
            “I want to have 1 million in my bank.”
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <button
            className="btn btn-mindmail btn-mindmail-secondary button-label"
            onClick={() => setAffirmationDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-mindmail btn-mindmail-primary button-label"
            onClick={handleDeleteAffirmation}
          >
            Yes, delete it!
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Affirmations
