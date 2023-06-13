import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import { GoogleLoginButton, FacebookLoginButton, withToast } from '@/components'
import { apiClientWithToken } from '@/store/apiClient'

interface State {
  email: string
  password: string
}
export const SignInModal = withToast(
  ({
    show,
    handleShow,
    handleForgotModal,
    toast,
  }: {
    show: boolean
    handleShow: AnyFunction
    handleForgotModal: AnyFunction
    toast: AnyFunction
  }) => {
    const navigate = useNavigate()
    const [alertString, setAlertString] = useState<string>('')
    const [errors, setErrors] = useState<State>({
      email: '',
      password: '',
    })
    const [fields, setFields] = useState<State>({
      email: '',
      password: '',
    })

    const handleValidation = () => {
      const fieldErrors = {
        email: '',
        password: '',
      }
      let formIsValid = true

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
        handleEmailSignIn(fields)
      } else {
        return false
      }
    }
    const handleEmailSignIn = async (newData: any) => {
      // remove this after test
      localStorage.setItem('mindmailtoken', 'test token')
      navigate('/dashboard/home')
      return
      await apiClientWithToken(localStorage.getItem('mindmailtoken'))
        .post('/signin/email', newData)
        .then((res) => {
          localStorage.setItem('mindmailtoken', res.data.token)
          navigate('/dashboard/home')
        })
        .catch((err) => {
          if (err.response === undefined) {
            setAlertString('something went wrong')
          } else {
            setAlertString(err.response.data.message)
          }
        })
    }
    const responseFacebook = async (response: any) => {
      await apiClientWithToken(localStorage.getItem('mindmailtoken'))
        .post('/signin/facebook', {
          email: response.email,
          name: response.name,
        })
        .then((res: any) => {
          localStorage.setItem('mindmailtoken', res.data.token)
          navigate('/dashboard/home')
        })
        .catch((err: any) => {
          if (err.response === undefined) {
            toast('something went wrong')
          } else {
            toast(err.response.data)
          }
        })
    }

    const handleGoogleSuccess = async (data: any) => {
      await apiClientWithToken(localStorage.getItem('mindmailtoken'))
        .post('/signin/google', { token: data.tokenId })
        .then((res) => {
          localStorage.setItem('mindmailtoken', res.data.token)
          navigate('/dashboard/home')
        })
        .catch((err) => {
          if (err.response === undefined) {
            toast('something went wrong')
          } else {
            toast(err.response.data)
          }
        })
    }

    const handleGoogleFailure = (err: any) => {
      toast(err)
    }
    return (
      <Modal
        show={show}
        onHide={() => handleShow(false)}
        centered
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        className="home-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h3 className="page-title text-secondary-color w-100 text-center">
            Sign in to your account
          </h3>

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

              <form className="text-center">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control button-label"
                    onChange={(e) => {
                      setFields({ ...fields, email: e.target.value })
                      setAlertString('')
                    }}
                    value={fields['email']}
                  />
                  <p className="label text-danger pl-2 pt-1 text-left">
                    {errors['email']}
                  </p>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control button-label"
                    onChange={(e) => {
                      setFields({ ...fields, password: e.target.value })
                      setAlertString('')
                    }}
                    value={fields['password']}
                  />
                  <p className="label text-danger pl-2 pt-1 text-left">
                    {errors['password']}
                  </p>
                  {alertString != '' ? (
                    <p className="label text-danger text-center">
                      {alertString}
                    </p>
                  ) : (
                    ''
                  )}
                  <p className="text-center">
                    <button
                      className="label text-primary-color border-0 bg-transparent"
                      onClick={handleForgotModal}
                      // onClick={() => console.log('Forgot your password')}
                    >
                      Forgot password?
                    </button>
                  </p>
                </div>
                <button
                  className="btn button-label mindmail-button button-primary px-5"
                  onClick={handleFormSubmit}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
          <div className="account-exist text-center">
            <p
              className={
                isMobile ? 'label color-black' : 'label text-primary-color'
              }
            >
              Don't have an account?
              <button
                className="bold text-primary-color text-underline ml-3 border-0 bg-transparent"
                onClick={() => navigate('/setup/signup')}
              >
                Sign up
              </button>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
)
