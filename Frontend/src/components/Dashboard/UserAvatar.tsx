import React from 'react'
import { isMobile } from 'react-device-detect'
import { FaBell, FaCircle } from 'react-icons/fa'
//
import { useSelector } from 'react-redux'

import type { AppState } from '@/store'
import { getLetterName } from '@/utility/LetterName'
//
const UserAvatar: React.FC<{ notification?: boolean }> = ({
  notification = false,
}) => {
  const userAvatarState = useSelector(
    (state: AppState) => state.buddy.userbuddy
  )
  return (
    <div className="user-avatar-section">
      {notification && (
        <div className="dashboard-notification">
          <FaBell size={isMobile ? 14 : 24} />
          <FaCircle
            size={isMobile ? 4 : 8}
            className="dashboard-notification-badge"
          />
        </div>
      )}
      <div className="user-avatar">
        {userAvatarState.photoURL === null ? (
          <div className="user-avatar-image">
            <span className="color-blue large-label">
              {getLetterName(
                userAvatarState.username === null
                  ? 'Alexis'
                  : userAvatarState.username
              )}
            </span>
          </div>
        ) : (
          <img
            src={userAvatarState.photoURL}
            alt="not found"
            className="user-avatar-image"
          />
        )}
      </div>
    </div>
  )
}

export default UserAvatar
