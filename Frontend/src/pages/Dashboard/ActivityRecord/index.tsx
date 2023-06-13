import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { IoIosJournal } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import ActivityRecordComponent from '@/components/ActivityRecord'
import UserAvatar from '@/components/Dashboard/UserAvatar'
import type { AppState } from '@/store'
import { getUserGoals } from '@/store/actions/goals'

import Footer from '../Layout/Footer'

const ActivityRecord: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const lastPath = location.pathname.split('-')
  const skip = lastPath.length == 2 ? lastPath[1] : ''

  useEffect(() => {
    getUserGoals(dispatch)
  }, [])

  const userGoals = useSelector((state: AppState) => state.goals.userGoals)

  return (
    <div className="dashboard-content">
      <div className="dashboard-content-right bg-gray-color--3 col-md-4 pb-5 pt-6">
        <UserAvatar notification={true} />
        <div className="dashboard-header-hero">
          <IoIosJournal size={16} className="mr-2" />
          <p className="paragraph">Your Activity Record</p>
        </div>

        <ActivityRecordComponent userGoals={userGoals} skip={skip} />
        {isMobile && <Footer />}
      </div>
    </div>
  )
}

export default ActivityRecord
