import { useState } from 'react'
import { Modal } from 'react-bootstrap'

import { LogoFull } from '@/assets/icons/LogoFull'
import { withToast } from '@/components'
import { apiClientWithToken } from '@/store/apiClient'

interface forget {
  email: string
}

export const ForgotModal = withToast(
  ({
    show,
    handleShow,
    toast,
  }: {
    show: boolean
    handleShow: AnyFunction
    toast: AnyFunction
  }) => {
    const [forgotError, setForgotError] = useState<forget>({
      email: '',
    })
    const [forgotField, setForgotField] = useState<forget>({
      email: '',
    })
    const handleForgetValidation = () => {
      const fieldErrors = {
        email: '',
      }
      let formIsValid = true
      // Email
      if (!forgotField['email']) {
        formIsValid = false
        fieldErrors['email'] = 'Email is required'
      }
      if (typeof forgotField['email'] !== 'undefined') {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (!emailPattern.test(forgotField['email'])) {
          formIsValid = false
          fieldErrors['email'] = 'Email is not valid'
        }
      }
      setForgotError(fieldErrors)
      return formIsValid
    }
    const forgetPassword = async (newData: any) => {
      await apiClientWithToken(localStorage.getItem('mindmailtoken'))
        .post('/forget/confirm', newData)
        .then(() => {
          handleShow(false)
        })
        .catch((err) => {
          if (err.response === undefined) {
            toast('something went wrong')
          } else {
            toast(err.response.data)
          }
        })
    }
    const handleForgetFormSubmit = (e: any) => {
      e.preventDefault()
      if (handleForgetValidation()) {
        forgetPassword(forgotField)
      } else {
        return false
      }
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
        <Modal.Body className="text-center">
          <LogoFull />

          <div className="login-form">
            <form>
              <h5 className="tab-label text-secondary-color pb-5">
                Enter your email address and we'll send you a link to reset your
                password
              </h5>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control button-label"
                  onChange={(e) =>
                    setForgotField({ ...forgotField, email: e.target.value })
                  }
                  value={forgotField['email']}
                />
                <p className="label text-danger pl-2 pt-1 text-left">
                  {forgotError['email']}
                </p>
              </div>
              <button
                className="btn button-label mindmail-button button-primary btn-block"
                onClick={handleForgetFormSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
)
