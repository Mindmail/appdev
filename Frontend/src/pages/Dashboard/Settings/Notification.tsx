import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { BsDot, IoNotifications, MdChevronRight } from 'react-icons/all'

const NotificationSetting: React.FC<{
  activeSetting: number
  setActiveSetting: any
}> = ({ activeSetting, setActiveSetting }) => {
  return (
    <div className="card-settings-wrapper">
      {isMobile && activeSetting === 0 && (
        <button
          className="card-settings-header border-0 bg-transparent"
          onClick={() => setActiveSetting(3)}
        >
          <IoNotifications size={32} />
          <p className="text-primary-color bold m-0 ml-2">Notification</p>
          <MdChevronRight size={24} />
        </button>
      )}
      {(!isMobile || (isMobile && activeSetting === 3)) && (
        <div className="card-settings">
          {isMobile && (
            <div className="card-settings-header-mobile">
              <IoNotifications size={24} />
              <p className="text-primary-color bold m-0 ml-2">Notification</p>
            </div>
          )}
          <Card>
            {!isMobile && (
              <Card.Header className="setting-title d-flex align-items-center flex-row bg-white">
                <IoNotifications size={32} />
                <p className="text-primary-color bold m-0 ml-2">Notification</p>
              </Card.Header>
            )}
            <ListGroup className="setting-content h-75">
              <ListGroupItem className="d-flex flex-row">
                <div className="d-flex flex-column w-100">
                  <p
                    className={`${
                      isMobile ? 'paragraph' : 'font-size-10'
                    } text-gray-color--1 font-weight-500 m-0 mb-1`}
                  >
                    Notification Time
                  </p>
                  <p
                    className={`${
                      isMobile
                        ? 'font-weight-500'
                        : 'font-weight-bold paragraph'
                    } text-primary-color m-0`}
                  >
                    6:00 am
                    <BsDot size={24} />
                    Monday - Friday
                  </p>
                </div>
                <div className="text-gray-color--1 font-size-10 font-weight-600">
                  <button className="text-gray-color--1 text-decoration-none border-0 bg-transparent">
                    Edit
                  </button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </div>
      )}
    </div>
  )
}

export default NotificationSetting
