import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { LogoBig } from '@/assets/icons/LogoBig'

import '@/assets/scss/pages/user-setup/home.scss'

import { Footer } from './Footer'

import { ForgotModal, SignInModal } from './'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [signInModalShow, setSignInModalShow] = useState<boolean>(false)
  const [forgotModalShow, setForgotModalShow] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem('mindmailtoken')) {
      navigate('/dashboard/home')
    }
  }, [])

  const handleForgotModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setSignInModalShow(false)
    setForgotModalShow(true)
  }

  const handleSignUpBtn = () => {
    navigate('/setup/signup')
  }

  return (
    <div className="container-fluid home-page-layout d-flex flex-column justify-content-between">
      <div className="header py-5">
        <div className="row">
          <div className="col-12 col-md-6 text-md-left text-center">
            <LogoBig width="80" height="80" />
          </div>
          <div className="d-none col-6 d-md-flex justify-content-end align-items-center">
            <button
              className="btn mindmail-button button-primary button-label ml-6 pl-5 pr-5"
              onClick={() => setSignInModalShow(true)}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="content-body">
          <div className="header-content">
            <h3 className="page-title text-secondary-color text-center">
              Welcome to Mindmail
            </h3>
            <h3 className="page-sub-title text-secondary-color text-center">
              The Most Effective Affirmation App
            </h3>
          </div>
          <p className="content-intro paragraph text-gray-color--1 text-md-center text-left">
            Many of you struggle with self-doubt and negative thoughts when you
            think about your goals thus it keeps you from moving forward in the
            direction you want to go. Mindmail will help you achieve your goal
            with scientific-based techniques.
          </p>
          <p className="content-intro  paragraph text-gray-color--1 text-md-center text-left">
            Your tool to achieve your goal every time and every day!
          </p>
          <div className="d-flex flex-column align-items-center pt-2 text-center">
            <button
              className="btn mindmail-button button-primary button-label text-nowrap px-5"
              onClick={handleSignUpBtn}
            >
              Try Mindmail for free
            </button>
            <button
              className="btn mindmail-button button-link button-label d-md-none mt-4"
              onClick={() => setSignInModalShow(true)}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <SignInModal
        show={signInModalShow}
        handleShow={setSignInModalShow}
        handleForgotModal={handleForgotModal}
      />
      <ForgotModal show={forgotModalShow} handleShow={setForgotModalShow} />
    </div>
  )
}

export default HomePage
