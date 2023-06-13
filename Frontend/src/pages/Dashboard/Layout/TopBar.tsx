import React from 'react'
import { FaInfoCircle, FaBell, FaCircle } from 'react-icons/fa'

import UserAvatar from '@/components/Dashboard/UserAvatar'
import Tooltip from '@/components/Tooltip'

const TopBar: React.FC<{
  title: string
  description: string
  tooltip: string
  info?: boolean
  notification?: boolean
}> = ({ title, description, tooltip, info = true, notification = false }) => {
  // const toolTipText = ""
  return (
    <div className="dashboard-header">
      {notification && (
        <div className="position-relative d-flex justify-content-end w-100">
          <div className="dashboard-notification">
            <FaBell size={14} />
            <FaCircle size={4} className="dashboard-notification-badge" />
          </div>
          <UserAvatar notification={false} />
        </div>
      )}
      <div className="dashboard-header-wrap">
        <div className="dashboard-title">
          <h3 className="page-title text-secondary-color">{title}</h3>
          <p className="label text-gray-color--1">{description}</p>
        </div>
        {info && (
          <div className="dashboard-information">
            <Tooltip icon={<FaInfoCircle size={19} />} text={tooltip} />
          </div>
        )}
      </div>
    </div>
  )
}

export default TopBar
