import React, { useState, useEffect } from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { BsDot, FaGoogle, FaUserCircle, MdChevronRight } from 'react-icons/all'
import { useNavigate } from 'react-router-dom'

import { updateUserInfo, deleteUserAccount } from '@/store/actions/user'

const ProfileSetting: React.FC<{
  profile: any
  activeSetting: number
  setActiveSetting: any
}> = ({ profile, activeSetting, setActiveSetting }) => {
  const [name, setName] = useState(profile.name)
  const [nameFocus, setNameFocus] = useState(1)
  const [email, setEmail] = useState(profile.email)
  const [emailFocus, setEmailFocus] = useState(1)
  const [password, setPassword] = useState(profile.password)
  const [passwordFocus, setPasswordFocus] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    setName(profile.name)
    setEmail(profile.email)
    setPassword(profile.password)
  }, [profile])

  const onFocusOut = () => {
    setNameFocus(1)
    setEmailFocus(1)
    setPasswordFocus(1)
    updateUserInfo({ email, name, password })
  }

  const onDeleteAccount = () => {
    deleteUserAccount()
      .then(() => {
        localStorage.removeItem('mindmailtoken')
        navigate('/')
      })
      .catch(() => {})
  }

  return (
    <div className="card-settings-wrapper">
      {isMobile && activeSetting === 0 && (
        <button
          className="card-settings-header border-0 bg-transparent"
          onClick={() => setActiveSetting(1)}
        >
          <FaUserCircle size={32} />
          <p className="text-primary-color bold m-0 ml-2">Profile</p>
          <MdChevronRight size={24} />
        </button>
      )}
      {(!isMobile || (isMobile && activeSetting === 1)) && (
        <div className="card-settings">
          {isMobile && (
            <div className="card-settings-header-mobile">
              <FaUserCircle size={24} />
              <p className="text-primary-color bold m-0 ml-2">Profile</p>
            </div>
          )}
          <Card>
            {!isMobile && (
              <Card.Header className="setting-title d-flex align-items-center flex-row bg-white">
                <FaUserCircle size={32} />
                <p className="text-primary-color bold m-0 ml-2">Profile</p>
              </Card.Header>
            )}
            <ListGroup className="setting-content">
              <ListGroupItem className="d-flex flex-row">
                <div className="d-flex flex-column w-100">
                  <p
                    className={`${
                      isMobile ? 'paragraph' : 'font-size-10'
                    } text-gray-color--1 font-weight-500 m-0 mb-1`}
                  >
                    Name
                  </p>
                  {nameFocus ? (
                    <p
                      className={`${
                        isMobile ? 'tab-label' : 'paragraph'
                      } text-primary-color font-weight-bold m-0`}
                    >
                      {name}
                    </p>
                  ) : (
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control button-label"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                      onBlur={onFocusOut}
                    />
                  )}
                </div>
                <div className="text-gray-color--1 font-size-10 font-weight-bold">
                  <button
                    className="text-gray-color--1 text-decoration-none border-0 bg-transparent"
                    onClick={() => setNameFocus(0)}
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
                    Email
                  </p>
                  {emailFocus ? (
                    <p
                      className={`${
                        isMobile ? 'tab-label' : 'paragraph'
                      } text-primary-color font-weight-bold m-0`}
                    >
                      {email}
                    </p>
                  ) : (
                    <input
                      type="text"
                      placeholder="Email"
                      className="form-control button-label"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={onFocusOut}
                    />
                  )}
                </div>
                <div className="text-gray-color--1 font-size-10 font-weight-bold">
                  <button
                    className="text-gray-color--1 text-decoration-none border-0 bg-transparent"
                    onClick={() => setEmailFocus(0)}
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
                    Password
                  </p>
                  {passwordFocus ? (
                    <p
                      className={`${
                        isMobile ? 'tab-label' : 'paragraph'
                      } text-primary-color font-weight-bold m-0`}
                    >
                      <BsDot size={24} />
                      <BsDot size={24} />
                      <BsDot size={24} />
                      <BsDot size={24} />
                      <BsDot size={24} />
                      <BsDot size={24} />
                    </p>
                  ) : (
                    <input
                      type="text"
                      placeholder="Password"
                      className="form-control button-label"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={onFocusOut}
                    />
                  )}
                </div>
                <div className="text-gray-color--1 font-size-10 font-weight-bold">
                  <button
                    className="text-gray-color--1 text-decoration-none border-0 bg-transparent"
                    onClick={() => setPasswordFocus(0)}
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
                    Linked Account
                  </p>
                  <p
                    className={`${
                      isMobile ? 'tab-label' : 'paragraph'
                    } text-primary-color font-weight-bold m-0`}
                  >
                    <FaGoogle size={20} /> Google
                  </p>
                </div>
                <div className="text-gray-color--1 font-size-10 font-weight-bold">
                  <button className="text-gray-color--1 text-decoration-none border-0 bg-transparent">
                    Edit
                  </button>
                </div>
              </ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Card.Link
                className={`text-gray-color--6 ${
                  isMobile
                    ? 'font-weight-500 tab-label text-center'
                    : 'sub-title'
                }`}
                onClick={onDeleteAccount}
              >
                Delete Account
              </Card.Link>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ProfileSetting
