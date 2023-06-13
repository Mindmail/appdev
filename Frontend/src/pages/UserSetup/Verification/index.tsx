/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import '../../../assets/scss/pages/user-setup/free-trial.scss'
// ## import integration module
import { useNavigate, useParams } from 'react-router-dom'

import { withToast } from '@/components'
import { apiClientWithToken } from '@/store/apiClient'

const Verification: React.FC<{ toast: AnyFunction }> = ({ toast }) => {
  const [state, setstate] = useState<boolean>(false)
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .get('/verify/' + params.token)
      .then((res) => {
        setstate(res.data.message)
        localStorage.setItem('mindmailtoken', res.data.token)
        setTimeout(() => {
          navigate('/setup/plan')
        }, 100000 * 60)
      })
      .catch((err) => {
        if (err.response === undefined) {
          toast('something went wrong')
        } else {
          toast(err.response.data)
        }
      })
  }, [])

  const onHome = () => {
    navigate('/setup/plan')
  }
  return (
    <div className="container-fluid trial-page-layout">
      <div className="header py-4 pt-4"></div>
      <div className="body">
        <div className="content-body">
          <div className="header-content">
            <h3 className="title-intro page-title text-primary-color p-4 text-center">
              {state}
            </h3>
          </div>
          <div className="login-form">
            <div>
              <div className="divider text-primary-color my-4">MindMail</div>
            </div>
            <button
              className="btn button-label btn-block mindmail-button button-primary"
              onClick={onHome}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withToast(Verification)
