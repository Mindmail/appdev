import React, { useState, useEffect } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { IoIosChatbubbles, MdChevronRight } from 'react-icons/all'

import Image1 from '@/assets/images/slidingImage1.png'
import SelectAvatarDialog from '@/components/SelectAvatarDialog'
import { updateChatBuddy } from '@/store/actions/chatbuddy'

export interface AvatarState {
  id: number
  photoURL: string
}

const AffChatBuddySetting: React.FC<{
  chatBuddy: any
  activeSetting: number
  setActiveSetting: any
}> = ({ chatBuddy, activeSetting, setActiveSetting }) => {
  const [botname, setBotname] = useState(chatBuddy.botname)
  const [botnameFocus, setBotnameFocus] = useState(1)
  const [openSelectAvatarDialog, setOpenSelectAvatarDialog] = useState(false)
  const [selectedBuddy, setSelectedBuddy] = useState<AvatarState>({
    id: chatBuddy.buddyId,
    photoURL: chatBuddy.botUrl,
  })

  useEffect(() => {
    setBotname(chatBuddy.botname)
    setSelectedBuddy({ id: chatBuddy.buddyId, photoURL: chatBuddy.botUrl })
  }, [chatBuddy])

  const onFocusOut = () => {
    setBotnameFocus(1)
    updateChatBuddy({
      buddyId: selectedBuddy.id,
      id: chatBuddy.id,
      name: botname,
    })
  }

  function openAvatarModal() {
    setOpenSelectAvatarDialog(true)
  }

  function closeAvatarModal() {
    setOpenSelectAvatarDialog(false)
    // console.log({ buddyId: selectedBuddy.id, id: chatBuddy.id, name: botname })
    updateChatBuddy({
      buddyId: selectedBuddy.id,
      id: chatBuddy.id,
      name: botname,
    })
  }

  return (
    <div className="card-settings-wrapper">
      {isMobile && activeSetting === 0 && (
        <button
          className="card-settings-header border-0 bg-transparent"
          onClick={() => setActiveSetting(2)}
        >
          <IoIosChatbubbles size={32} />
          <p className="text-primary-color bold m-0 ml-2">
            Affirmation Chat Buddy
          </p>
          <MdChevronRight size={24} />
        </button>
      )}
      {(!isMobile || (isMobile && activeSetting === 2)) && (
        <div className="card-settings">
          {isMobile && (
            <div className="card-settings-header-mobile">
              <IoIosChatbubbles size={24} />
              <p className="text-primary-color bold m-0 ml-2">
                Affirmation Chat Buddy
              </p>
            </div>
          )}
          <Card>
            {!isMobile && (
              <Card.Header className="setting-title d-flex align-items-center flex-row bg-white">
                <IoIosChatbubbles size={32} />
                <p className="text-primary-color font-weight-500 text-nowrap m-0 ml-2">
                  Affirmation Chat Buddy
                </p>
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
                    Name
                  </p>
                  {botnameFocus ? (
                    <p
                      className={`${
                        isMobile ? 'tab-label' : 'paragraph'
                      } text-primary-color font-weight-bold m-0`}
                    >
                      {botname}
                    </p>
                  ) : (
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control button-label"
                      value={botname}
                      onChange={(e) => setBotname(e.target.value)}
                      onBlur={onFocusOut}
                    />
                  )}
                </div>
                <div className="text-gray-color--1 font-size-10 font-weight-600">
                  <button
                    className="text-gray-color--1 text-decoration-none border-0 bg-transparent"
                    onClick={() => setBotnameFocus(0)}
                  >
                    Edit
                  </button>
                </div>
              </ListGroupItem>
              <ListGroupItem className="d-flex flex-row">
                <div className="d-flex flex-column w-100">
                  <p
                    className={`${
                      isMobile ? 'paragraph' : 'font-size-10'
                    } text-gray-color--1 font-weight-500 m-0 mb-1`}
                  >
                    Photo
                  </p>
                  <img
                    className="setting-avatar"
                    src={
                      selectedBuddy.photoURL ? selectedBuddy.photoURL : Image1
                    }
                    alt="setting avatar"
                  />
                  <SelectAvatarDialog
                    show={openSelectAvatarDialog}
                    handleCloseDialog={closeAvatarModal}
                    setSelectedBuddy={setSelectedBuddy}
                  />
                </div>
                <div className="text-gray-color--1 font-size-10 font-weight-600">
                  <button
                    className="text-gray-color--1 text-decoration-none border-0 bg-transparent"
                    onClick={openAvatarModal}
                  >
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

export default AffChatBuddySetting
