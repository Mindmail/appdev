import React, { useState, useEffect } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { MdCardMembership, MdChevronRight } from 'react-icons/all'

const SubscriptionSetting: React.FC<{
  subscription: any
  activeSetting: number
  setActiveSetting: any
}> = ({ subscription, activeSetting, setActiveSetting }) => {
  const [type, setType] = useState(subscription.type)
  // const [purchase, setPurchase] = useState(subscription.purchase)
  const [purchaseText, setPurchaseText] = useState('')

  useEffect(() => {
    setType(subscription.type)
    // setPurchase(subscription.purchase)

    if (subscription.purchase == 'free') {
      const newDate = new Date(subscription.created)
      newDate.setDate(newDate.getDate() + 14)
      // console.log(subscription.created)
      setPurchaseText(
        '14 Days Free Trail will end on ' + newDate.toDateString()
      )
    }
  }, [subscription])

  return (
    <div className="card-settings-wrapper">
      {isMobile && activeSetting === 0 && (
        <button
          className="card-settings-header border-0 bg-transparent"
          onClick={() => setActiveSetting(4)}
        >
          <MdCardMembership size={32} />
          <p className="text-primary-color bold m-0 ml-2">Subscription</p>
          <MdChevronRight size={24} />
        </button>
      )}
      {(!isMobile || (isMobile && activeSetting === 4)) && (
        <div className="card-settings">
          {isMobile && (
            <div className="card-settings-header-mobile">
              <MdCardMembership size={24} />
              <p className="text-primary-color bold m-0 ml-2">Subscription</p>
            </div>
          )}
          <Card>
            {!isMobile && (
              <Card.Header className="setting-title d-flex align-items-center flex-row bg-white">
                <MdCardMembership size={32} />
                <p className="text-primary-color bold m-0 ml-2">Subscription</p>
              </Card.Header>
            )}
            <ListGroup className="setting-content h-75">
              <ListGroupItem className="d-flex flex-row">
                <div
                  className={`d-flex flex-column ${
                    isMobile ? 'w-75 mr-4' : 'w-100'
                  }`}
                >
                  <p
                    className={`${
                      isMobile ? 'paragraph' : 'font-size-10'
                    } text-gray-color--1 font-weight-500 m-0 mb-1`}
                  >
                    Current Subscription
                  </p>
                  <p
                    className={`${
                      isMobile ? 'tab-label' : 'paragraph'
                    } text-primary-color font-weight-bold text-nowrap m-0`}
                  >
                    Mindmail &nbsp;{type} Jump in
                  </p>
                  <p
                    className={`text-gray-color--6 ${
                      isMobile ? 'paragraph' : 'label text-nowrap'
                    } m-0`}
                  >
                    {purchaseText}
                  </p>
                </div>
                <div className="text-gray-color--1 font-size-10 font-weight-600">
                  <button className="text-gray-color--5 text-decoration-none border-0 bg-transparent">
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

export default SubscriptionSetting
