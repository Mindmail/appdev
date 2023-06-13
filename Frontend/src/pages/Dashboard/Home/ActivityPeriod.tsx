import React from 'react'
import { MdDateRange, IoCaretBack, IoCaretForward } from 'react-icons/all'

const ActivityPeriod: React.FC = () => {
  return (
    <>
      <div className="activity-periods-wrapper mb-2">
        <p className="text-primary-color">Your Activity Period of Time</p>
        <div className="activity-periods d-flex justify-content-center align-items-center justify-content-between flex-row p-2">
          <button className="btn btn-mindmail">
            <IoCaretBack size={20} className="text-primary-color" />
          </button>
          <p className="text-primary-color m-0">
            <MdDateRange size={20} /> Week 12 , Mar 22 - Mar 28
          </p>
          <button className="btn btn-mindmail">
            <IoCaretForward size={20} className="text-primary-color" />
          </button>
        </div>
      </div>
    </>
  )
}

export default ActivityPeriod
