import React, { useState } from 'react'
import '@/assets/scss/pages/user-setup/free-trial.scss'
import { useNavigate, useParams } from 'react-router-dom'

import { withToast } from '@/components'
import { apiClientWithToken } from '@/store/apiClient'

export interface State {
  password1: string
  password2: string
}

const ResetPassword: React.FC<{ toast: AnyFunction }> = ({ toast }) => {
  const navigate = useNavigate()
  const params = useParams()
  const [errors, setErrors] = useState<State>({
    password1: '',
    password2: '',
  })
  const [fields, setFields] = useState<State>({
    password1: '',
    password2: '',
  })
  const [Error, setError] = useState<string>('')
  const handleValidation = () => {
    const fieldErrors = {
      password1: '',
      password2: '',
    }
    let formIsValid = true

    //Password1
    if (!fields['password1']) {
      formIsValid = false
      fieldErrors['password1'] = 'Password is required'
    } else {
      if (fields['password1'].toLocaleLowerCase() === fields['password1']) {
        formIsValid = false
        fieldErrors['password1'] =
          'Password should have more than 1 upper case letter'
      } else if (fields['password1'].length < 8) {
        formIsValid = false
        fieldErrors['password1'] = 'Password should be more than 8 characters'
      }
    }
    //password2
    if (!fields['password2']) {
      formIsValid = false
      fieldErrors['password2'] = 'Confirm Password is required'
    } else {
      if (fields['password2'].toLocaleLowerCase() === fields['password2']) {
        formIsValid = false
        fieldErrors['password2'] =
          'Password should have more than 1 upper case letter'
      } else if (fields['password2'].length < 8) {
        formIsValid = false
        fieldErrors['password2'] = 'Password should be more than 8 characters'
      } else if (fields['password2'] !== fields['password1']) {
        formIsValid = false
        fieldErrors['password2'] = fieldErrors['password1'] =
          'Password and Confirm Password should be same'
      }
    }
    setErrors(fieldErrors)
    return formIsValid
  }
  const handleFormSubmit = async () => {
    if (handleValidation()) {
      await apiClientWithToken(localStorage.getItem('mindmailtoken'))
        .put('/forget/reset', {
          password: fields['password1'],
          token: params.token,
        })
        .then((res) => {
          if (res.data.type) {
            localStorage.removeItem('mindmailtoken')
            setError(res.data.message)
            navigate('/setup')
          } else {
            setError(res.data.message)
          }
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

  const backSignUp = () => {
    navigate('/setup')
  }
  return (
    <div className="container-fluid trial-page-layout">
      <div className="header py-4 pt-4"></div>
      <div className="body">
        <div className="content-body">
          <div className="header-content">
            <h3 className="title-intro page-title text-secondary-color p-4 text-center">
              Choose a new Password!
            </h3>
          </div>
          <div className="login-form">
            <div>
              <div className="divider text-primary-color my-4">MindMail</div>
              <p className="label text-danger pl-2 pt-1">{Error}</p>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control button-label"
                  onChange={(e) =>
                    setFields({ ...fields, password1: e.target.value })
                  }
                  value={fields['password1']}
                />
                <p className="label text-danger pl-2 pt-1">
                  {errors['password1']}
                </p>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control button-label"
                  onChange={(e) =>
                    setFields({ ...fields, password2: e.target.value })
                  }
                  value={fields['password2']}
                />
                <p className="label text-danger pl-2 pt-1">
                  {errors['password2']}
                </p>
              </div>
              <button
                className="btn button-label mindmail-button button-primary btn-block"
                onClick={handleFormSubmit}
              >
                {'Reset Password'}
              </button>
            </div>
            <div className="divider text-primary-color my-5">
              Don't you reset Password? &nbsp;&nbsp;&nbsp;
              <button onClick={backSignUp} style={{ cursor: 'pointer' }}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withToast(ResetPassword)
