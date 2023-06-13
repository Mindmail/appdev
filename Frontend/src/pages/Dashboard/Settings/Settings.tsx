import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { IoMdSettings } from 'react-icons/io'

import { getAllUserInfo } from '@/store/actions/user'

import UserAvatar from '../../../components/Dashboard/UserAvatar'
import TopBar from '../Layout/TopBar'

import AdditionalSetting from './Additional'
import AffChatBuddySetting from './AffChatBuddy'
import NotificationSetting from './Notification'
import ProfileSetting from './Profile'
import SubscriptionSetting from './Subscription'

import '@/assets/scss/pages/dashboard/settings.scss'

const Settings: React.FC = () => {
  // const navigate = useNavigate()
  const [activeSetting, setActiveSetting] = useState(0)
  const [profile, setProfile] = useState({})
  const [chatBuddy, setChatBuddy] = useState({})
  // const [notification, setNotification] = useState({})
  const [subscription, setSubscription] = useState({})

  const analyzeUserInfo = (userInfo: any) => {
    setProfile({
      email: userInfo.email,
      name: userInfo.name,
      password: undefined,
    })
    setChatBuddy({
      botUrl: userInfo.botUrl,
      botname: userInfo.botname,
      buddyId: userInfo.buddyId,
      id: userInfo.userBuddyId,
    })
    setSubscription({
      created: userInfo.created_on,
      id: userInfo.trialId,
      purchase: userInfo.purchase,
      type: userInfo.type,
    })
  }
  useEffect(() => {
    getAllUserInfo()
      .then((res) => {
        if (res.data.data.length > 0) analyzeUserInfo(res.data.data[0])
      })
      .catch(() => {
        // console.log(e)
      })
  }, [])

  return (
    <div
      className={`dashboard-setting-content  ${
        isMobile ? 'bg-gray-color--3' : ''
      } `}
    >
      {isMobile && (
        <div className="d-flex flex-row-reverse">
          <UserAvatar notification={true} />
        </div>
      )}
      {isMobile ? (
        <div className="dashboard-setting-header col-md-4 pb-5 pt-6">
          <div className="dashboard-setting-header-hero">
            <IoMdSettings
              size={45}
              className="ml-2 mr-2 cursor-pointer"
              onClick={() => setActiveSetting(0)}
            />
            <p className="seetings-font">Settings</p>
            <p className="paragraph">
              You can modify your Mindmail
              <br />
              training program account here
            </p>
          </div>
        </div>
      ) : (
        <TopBar
          title="Settings"
          description="You can modify your Mindmail training program account here"
          tooltip="Settings"
          notification={false}
          info={false}
        />
      )}
      <div className="dashboard-settings">
        <ProfileSetting
          profile={profile}
          activeSetting={activeSetting}
          setActiveSetting={setActiveSetting}
        />
        <AffChatBuddySetting
          chatBuddy={chatBuddy}
          activeSetting={activeSetting}
          setActiveSetting={setActiveSetting}
        />
        <NotificationSetting
          activeSetting={activeSetting}
          setActiveSetting={setActiveSetting}
        />
        <SubscriptionSetting
          subscription={subscription}
          activeSetting={activeSetting}
          setActiveSetting={setActiveSetting}
        />
        <AdditionalSetting
          activeSetting={activeSetting}
          setActiveSetting={setActiveSetting}
        />
      </div>
    </div>
  )
}

export default Settings
