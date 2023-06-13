import React, { useEffect } from 'react'
// import { isMobile } from 'react-device-detect'
import { IoIosJournal, IoIosArrowForward } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

// import Image1 from '@/assets/images/Homevideo.png'
// import sampleVideo from '@/assets/sample.mp4'
import ActivityRecord from '@/components/ActivityRecord'
// import AdvertisingModal from '@/components/AdvertisingModal'
// import UserAvatar from '@/components/Dashboard/UserAvatar'
import Advertising from '@/components/Dashboard/Advertising'
import type { AppState } from '@/store'
import {
  getUserGoals,
  // addUserGoal,
  // updateUserGoal,
} from '@/store/actions/goals'

import DashboardLayout from '../Layout/DashboardLayout'
import TopBar from '../Layout/TopBar'

import FriendReferral from './FriendReferral'

//
const Home: React.FC = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const lastPath = location.pathname.split('-')
  const skip = lastPath.length == 2 ? lastPath[1] : ''

  useEffect(() => {
    getUserGoals(dispatch)
  }, [])

  const userGoals = useSelector((state: AppState) => state.goals.userGoals)

  return (
    <DashboardLayout
      sideComponent={<ActivityRecord userGoals={userGoals} skip={skip} />}
    >
      <TopBar
        title={`Hello, Alexis`}
        description="Start your Mindmail journey today, you’re on the way to reach your goals!"
        tooltip="Based on scientific research, an affirmation can work very well when people not only say the affirmation in present tense but also share their affirmations in conversation."
      />
      <Advertising
        title="The Most Effective Affirmation App"
        description="Mindmail"
      />
      <Link
        to={{
          pathname: '/dashboard/activity-record',
        }}
      >
        <div className="d-md-none activity-record-button">
          <span className="paragraph">
            <IoIosJournal size={16} className="mr-2" />
            Your Activity Record
          </span>
          <IoIosArrowForward size={16} />
        </div>
      </Link>
      <FriendReferral />
    </DashboardLayout>
  )
}

export default Home
