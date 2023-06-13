/* eslint-disable import/order */
import React, { useState, useEffect } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import '../../../assets/scss/pages/user-setup/free-trial.scss'
import { GiHamburgerMenu } from 'react-icons/all'
import { isMobile } from 'react-device-detect'
// ## import integration module
import { apiClientWithToken } from '@/store/apiClient'
import { LogoBig } from '@/assets/icons/LogoBig'
import { useNavigate } from 'react-router-dom'
import { GoogleLoginButton, FacebookLoginButton, withToast } from '@/components'
import { useGoogleLogin } from '@/hooks/useGoogleLogin'
import { useFacebookLogin } from '@/hooks/useFacebookLogin'

export interface State {
  name: string
  email: string
  password: string
}

const Index: React.FC<{ toast: AnyFunction }> = ({ toast }) => {
  const navigate = useNavigate()
  // const location = useLocation()
  // const parentUrl = '/' + (location.pathname.split('/')[1] || '')

  const { handleGoogleSuccess, handleGoogleFailure } = useGoogleLogin(toast)
  const { responseFacebook } = useFacebookLogin({ callback: toast })
  const [errors, setErrors] = useState<State>({
    email: '',
    name: '',
    password: '',
  })
  const [fields, setFields] = useState<State>({
    email: '',
    name: '',
    password: '',
  })
  const [verifyNotify, setVerifyNotify] = useState({ message: '', type: 0 })

  useEffect(() => {
    if (localStorage.getItem('mindmailtoken')) {
      navigate('/dashboard/home')
    }
  }, [])

  const handleValidation = () => {
    const fieldErrors = {
      email: '',
      name: '',
      password: '',
    }
    let formIsValid = true
    //Name
    if (!fields['name']) {
      formIsValid = false
      fieldErrors['name'] = 'Name is required'
    } else {
      if (typeof fields['name'] !== 'undefined') {
        if (!fields['name'].match(/^[a-zA-Z0-9 ]+$/)) {
          formIsValid = false
          fieldErrors['name'] = 'Please use only letter for name'
        }
      }
    }

    //Email
    if (!fields['email']) {
      formIsValid = false
      fieldErrors['email'] = 'Email is required'
    }
    if (typeof fields['email'] !== 'undefined') {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      if (!emailPattern.test(fields['email'])) {
        formIsValid = false
        fieldErrors['email'] = 'Email is not valid'
      }
    }
    //Password
    if (!fields['password']) {
      formIsValid = false
      fieldErrors['password'] = 'Password is required'
    } else {
      if (fields['password'].toLocaleLowerCase() === fields['password']) {
        formIsValid = false
        fieldErrors['password'] =
          'Password should have more than 1 upper case letter'
      } else if (fields['password'].length < 8) {
        formIsValid = false
        fieldErrors['password'] = 'Password should be more than 8 characters'
      }
    }
    setErrors(fieldErrors)
    return formIsValid
  }

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    if (handleValidation()) {
      handleEmailSignUp(fields)
    } else {
      return false
    }
  }

  const handleEmailSignUp = async (newData: State) => {
    // remove this after test
    navigate('/setup/plan')
    return
    await apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .post('/signup/email', newData)
      .then((response: any) => {
        if (response.data.type == 'success') {
          setVerifyNotify({ message: response.data.message, type: 1 })
        }
      })
      .catch((err: any) => {
        if (err.response === undefined) {
          toast('something went wrong')
        } else {
          setVerifyNotify({ message: err.response.data.message, type: 2 })
        }
      })
  }

  const handleSignIn = () => {
    navigate('/setup')
  }

  return (
    <div className="container-fluid trial-page-layout">
      <div className="header py-4 pt-4">
        <div className="d-md-none mobile-header align-items-center position-relative">
          <div className="position-absolute mobile-header-logo">
            <LogoBig width="80" height="80" />
          </div>
          <div className="mobile-header-menu">
            <button className="btn button-label ml-6">
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
        <div className="d-none d-md-fle row align-items-center justify-content-end">
          <div className="col-md-3">
            <button
              className="btn mindmail-button button-secondary button-label d-none ml-6 pl-5 pr-5"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="content-body">
          <div className="header-content">
            <h3 className="title-intro page-title text-secondary-color p-4 text-center">
              Try Mindmail Premium for free!
            </h3>
          </div>
          <div className="content-intro text-gray-color--1">
            <div className="free-trial-list center">
              <ul>
                <li>
                  <AiOutlineCheck
                    className="text-primary-color mr-2"
                    size={16}
                  />{' '}
                  <p>No more negative thoughts, only unstoppable successes</p>
                </li>
                <li>
                  <AiOutlineCheck
                    className="text-primary-color mr-2"
                    size={16}
                  />{' '}
                  <p>
                    Unlimited affirmation practices to help you reach your goal
                  </p>
                </li>
                <li>
                  <AiOutlineCheck
                    className="text-primary-color mr-2"
                    size={16}
                  />{' '}
                  <p>No Ads but most supportive and secure platform</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="login-form">
            <div className="row">
              <div className="col-md-6">
                <FacebookLoginButton handleResponse={responseFacebook} />
              </div>
              <div className="col-md-6">
                <GoogleLoginButton
                  handleSuccess={handleGoogleSuccess}
                  handleFailure={handleGoogleFailure}
                />
              </div>
            </div>
            <div>
              <div className="divider text-primary-color my-4">OR</div>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="form-control button-label"
                    onChange={(e) =>
                      setFields({
                        ...fields,
                        name: e.target.value.replace(/\s\s+/g, ' '),
                      })
                    }
                    value={fields['name']}
                  />
                  <p className="label text-danger pl-2 pt-1">
                    {errors['name']}
                  </p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control button-label"
                    onChange={(e) =>
                      setFields({ ...fields, email: e.target.value })
                    }
                    value={fields['email']}
                  />
                  <p className="label text-danger pl-2 pt-1">
                    {errors['email']}
                  </p>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control button-label"
                    onChange={(e) =>
                      setFields({ ...fields, password: e.target.value })
                    }
                    value={fields['password']}
                  />
                  <p className="label text-danger pl-2 pt-1">
                    {errors['password']}
                  </p>
                  {errors['password'] === '' && (
                    <div
                      className={`label footer-content mt-2 text-center ${
                        isMobile ? 'color-black' : 'text-primary-color'
                      }`}
                    >
                      <p>
                        Please create at least characters with 1 upper case
                        letter <br></br>
                      </p>
                    </div>
                  )}
                  {verifyNotify.type == 1 && (
                    <div className="alert alert-success" role="alert">
                      {verifyNotify.message}
                    </div>
                  )}
                  {verifyNotify.type == 2 && (
                    <div className="alert alert-warning" role="alert">
                      {verifyNotify.message}
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn button-label mindmail-button button-primary btn-block"
                    onClick={handleFormSubmit}
                  >
                    <span className="d-md-none">Try Mindmail for free</span>
                    <span className="d-none d-md-block">
                      Sign up your account for trial
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            className={`${
              isMobile ? 'black-color' : 'text-primary-color'
            } label footer-content mt-2 text-center`}
          >
            <p>
              {' '}
              By signing up to Mindmail you agree to our <br></br>
              <button className="link-to-page text-primary-color bold border-0 bg-transparent">
                Terms
              </button>{' '}
              and{' '}
              <button className="link-to-page text-primary-color bold border-0 bg-transparent">
                Privacy Policy
              </button>
            </p>
            <p className="d-md-none sign-in d-flex align-items-center justify-content-between bold mt-4">
              <span>Already have an account?</span>
              <button
                className="btn mindmail-button button-link button-label"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withToast(Index)
