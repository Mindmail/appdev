import React from 'react'
import { isMobile } from 'react-device-detect'
import { FaRegCheckCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
// ## import integration module

import { apiClientWithToken } from '@/store/apiClient'

import { withToast } from '../withToast'

import type { PlanCard } from './cards'
export interface State {
  type: string
  purchase: string
}

const SetupPlanCard: React.FC<{
  planCard: PlanCard
  active: boolean
  setActive: any
  index: number
  toast: AnyFunction
}> = ({ planCard, active, /*setActive,*/ index, toast }) => {
  const navigate = useNavigate()
  const handleSelectPlan = (cardId: string) => {
    let purchase = 'free'
    if (cardId === 'chill' || cardId === 'deep') {
      purchase = 'none'
    }
    const data: State = {
      purchase,
      type: cardId,
    }
    CreateTrial(data)
  }

  const CreateTrial = async (data: State) => {
    // remove this after test
    navigate('/setup/card')
    return
    await apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .post('/user/plan', data)
      .then(() => {
        navigate('/setup/card')
      })
      .catch((err) => {
        if (err.response === undefined) {
          // console.log('something went wrong')
          toast('something went wrong')
        } else {
          toast(err.response.data)
          // console.log(err.response.data)
        }
      })
  }
  return (
    <>
      <div
        className={
          isMobile ? 'card-container ' + (active ? 'active' : '') : 'col-4'
        }
      >
        <div className="card position-relative mindmail-card tab-label">
          <div className="card-header bg-primary-color font-weight-bold text-center text-white">
            {planCard?.title}
          </div>
          <div className="card-body flex-column flex">
            <div className="margin-bottom-md mobile-flex text-center">
              <h4
                className={`page-title text-primary-color ${
                  isMobile ? '' : 'mt-4'
                }`}
              >
                {planCard?.price}
              </h4>
              <p className="label text-gray-color--5 mb-0">
                Per year/12 months
              </p>
            </div>

            <div className="margin-bottom-md">
              {(planCard?.services || []).map((service: any, idx: number) => {
                return (
                  <span key={idx}>
                    <p className="label text-secondary-color margin-bottom-sm d-flex">
                      <FaRegCheckCircle
                        size="16"
                        className="text-primary-color mx-3"
                      />{' '}
                      <span>{service.name}</span>
                    </p>
                  </span>
                )
              })}
            </div>
          </div>
          <div className="pb-5 text-center">
            <button
              type="button"
              className={
                'btn mindmail-button ' +
                (isMobile
                  ? active
                    ? ' button-secondary mobilebutton'
                    : ' button-primary mobilebutton'
                  : planCard.id === 2
                  ? ' button-primary '
                  : ' button-outline')
              }
              onClick={() => handleSelectPlan(planCard.type)}
            >
              {planCard?.buttonText}
            </button>
            {planCard?.linkText && (
              <div
                style={{ bottom: '1em' }}
                className="position-absolute w-100 label text-gray-color--5"
              >
                {!isMobile && (
                  <>
                    Or
                    <Link
                      to="/setup/card"
                      className="text-gray-color--5 ml-1"
                      style={{ cursor: 'pointer' }}
                    >
                      {planCard?.linkText}
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {isMobile && index === 0 && (
        <div className="d-flex align-items-center justify-content-center flex-row pb-4">
          <span className="button-label text-primary-color font-weight-600">
            <b>OR</b>
          </span>
          <button className="btn mindmail-button button-link button-label ml-2">
            {planCard?.linkText}
          </button>
        </div>
      )}
    </>
  )
}

export default withToast(SetupPlanCard)
