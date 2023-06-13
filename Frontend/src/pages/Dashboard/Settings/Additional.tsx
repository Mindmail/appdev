import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { MdChevronRight, MdLiveHelp } from 'react-icons/all'

const labels = [
  { label: 'Help & Support', url: '' },
  { label: 'Privacy Policy', url: '' },
  { label: 'Terms of Service', url: '' },
]
const AdditionalSetting: React.FC<{
  activeSetting: number
  setActiveSetting: any
}> = ({ activeSetting, setActiveSetting }) => {
  return (
    <div className="card-settings-wrapper">
      {isMobile && activeSetting === 0 && (
        <button
          className="card-settings-header border-0 bg-transparent"
          onClick={() => setActiveSetting(5)}
        >
          <MdLiveHelp size={32} />
          <p className="text-primary-color bold m-0 ml-2">
            Additional Information
          </p>
          <MdChevronRight size={24} />
        </button>
      )}
      {(!isMobile || (isMobile && activeSetting === 5)) && (
        <div className="card-settings">
          {isMobile && (
            <div className="card-settings-header-mobile">
              <MdLiveHelp size={24} />
              <p className="text-primary-color font-weight-500 text-nowrap m-0 ml-2">
                Additional Information
              </p>
            </div>
          )}
          <Card>
            {!isMobile && (
              <Card.Header className="setting-title d-flex align-items-center flex-row bg-white">
                <MdLiveHelp size={32} />
                <p className="text-primary-color font-weight-500 text-nowrap m-0 ml-2">
                  Additional Information
                </p>
              </Card.Header>
            )}
            <ListGroup className="setting-content h-75">
              {labels.map((item: any, index: number) => (
                <ListGroupItem className="d-flex flex-row" key={index}>
                  <div className="d-flex flex-column w-100">
                    <p
                      className={`${
                        isMobile ? 'tab-label' : 'paragraph'
                      } text-primary-color font-weight-bold text-nowrap m-0`}
                    >
                      {item.label}
                    </p>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card>
        </div>
      )}
    </div>
  )
}

export default AdditionalSetting
