import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'

import Avatar from '@/assets/icons/Avatar'
import { withToast } from '@/components'
import SelectAvatarDialog from '@/components/SelectAvatarDialog'
import { createChatBuddy } from '@/store/actions/chatbuddy'

import AvatarMobile from '../../../assets/icons/AvatarMobile'

export interface AvatarState {
  id: number
  photoURL: string
}

const AffirmationChatBuddy: React.FC<{
  stepper: any
  handleNext: any
  toast: AnyFunction
}> = ({
  // children,
  // stepper,
  handleNext,
  toast,
}) => {
  const [openSelectAvatarDialog, setOpenSelectAvatarDialog] = useState(false)
  const [selectedBuddy, setSelectedBuddy] = useState<AvatarState>({
    id: 0,
    photoURL: '',
  })
  const [InputAvatarName, setInputAvatarName] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleValidation = () => {
    let Error = ''
    let IsValid = true
    if (!InputAvatarName) {
      IsValid = false
      Error = "ChatBuddy's Name is required"
    }
    if (!selectedBuddy.id) {
      IsValid = false
      Error = "ChatBuddy's Photo is required"
    }
    setError(Error)
    return IsValid
  }
  function openAvatarModal() {
    setOpenSelectAvatarDialog(true)
  }

  function closeAvatarModal() {
    setOpenSelectAvatarDialog(false)
  }

  const handleNextClick = () => {
    if (handleValidation()) {
      createChatBuddy({ buddyId: selectedBuddy.id, name: InputAvatarName })
        .then(() => {
          handleNext()
        })
        .catch((err) => {
          if (err.response === undefined) {
            toast('something went wrong')
          } else {
            toast(err.response.data)
          }
        })
    } else {
      return false
    }
  }

  return (
    <div className="text-center">
      <h3 className="page-title text-secondary-color">
        {isMobile
          ? "Now, let's create your affirmation chat buddy"
          : "Now, let's create your affirmation chat buddy who will guide you through your journey"}
      </h3>
      <p
        className={`paragraph text-gray-color--1 text-justify-last-center my-4 ${
          isMobile ? '' : 'w-50 mx-auto'
        }`}
      >
        This is the affirmation chat Future that is designed to help you train
        your mind to respond to your affirmation and abandon negative thoughts.
        Therefore, we recommend you personalize your chat buddy for enhance your
        affirmation power so you can surpass your potentials!
      </p>
      <div
        className={
          'd-flex flex-column mx-auto my-5' + (!isMobile ? ' w-50 ' : '')
        }
      >
        <Form>
          <div className="cursor-pointer">
            {!selectedBuddy.id &&
              (isMobile ? (
                <AvatarMobile avatarModal={() => openAvatarModal()} />
              ) : (
                <Avatar avatarModal={() => openAvatarModal()} />
              ))}
            {selectedBuddy.id !== 0 && (
              <button
                className="border-0 bg-transparent"
                onClick={() => openAvatarModal()}
              >
                <img
                  className="el-border-primary"
                  style={{
                    borderRadius: '150px',
                    cursor: 'pointer',
                    height: isMobile ? '156px' : '206px',
                    objectFit: 'cover',
                    width: isMobile ? '156px' : '206px',
                  }}
                  src={selectedBuddy.photoURL}
                  alt=""
                />
              </button>
            )}
            {isMobile && (
              <p className="label text-gray-color--1 p-2">
                Choose your chat buddy’s photo
              </p>
            )}
          </div>
          <input type="file" id="myfile" style={{ display: 'none' }} />
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className={
                'my-4 bg-transparent ' +
                (isMobile ? ' w-75 ml-auto mr-auto ' : '')
              }
              type="text"
              placeholder={
                isMobile ? 'Name your Zen-bud as….' : 'Name your Zen-bud as….'
              }
              value={InputAvatarName}
              onChange={(e) => setInputAvatarName(e.target.value)}
            />
            <p className="label text-danger">{error}</p>
          </Form.Group>
        </Form>
        <SelectAvatarDialog
          show={openSelectAvatarDialog}
          handleCloseDialog={closeAvatarModal}
          setSelectedBuddy={setSelectedBuddy}
        />
        <div className={'buttons' + (isMobile ? ' w-75 m-auto ' : '')}>
          <button
            type="button"
            className="btn mindmail-button button-primary button-label w-100"
            onClick={handleNextClick}
          >
            Continue
          </button>
          <div className="mt-2 text-center">
            <Link
              className="text-primary-color button-label underlined w-100 cursor-pointer"
              to="/dashboard/home/skip-gratitude"
            >
              I will skip the set up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withToast(AffirmationChatBuddy)
