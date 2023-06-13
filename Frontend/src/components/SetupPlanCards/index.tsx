import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'

import { LogoBig } from '../../assets/icons/LogoBig'

import { plans } from './cards'
import SetupPlanCard from './SetupPlanCards'
import '@/assets/scss/pages/user-setup/plan-setup.scss'

const Index: React.FC = () => {
  const [activePlan, setActivePlan] = useState(0)
  return (
    <div className="plan-setup-cards-container d-flex flex-column">
      <div className="header py-4 pt-4">
        {isMobile ? (
          <div className="mobile-header align-items-center position-relative">
            <div className="position-absolute mobile-header-logo">
              <LogoBig width="80" height="80" />
            </div>
          </div>
        ) : (
          <div className="row invisible">
            <div className="w-100 d-flex justify-content-end align-items-center">
              <button className="btn mindmail-button button-primary button-label ml-6 pl-5 pr-5">
                Sign in
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="body">
        <div className="content-body">
          <div className="text-center">
            <h3 className="page-title text-secondary-color">
              One step closer to free trial
            </h3>
            {!isMobile ? (
              <>
                <h3 className="page-title text-secondary-color">
                  Choose the plan that works for you
                </h3>
                <p className="paragraph text-gray-color--1 my-4">
                  No worries, you can upgrade, downgrade, cancel at anytime
                </p>
              </>
            ) : (
              <p className="label text-gray-color--1 my-4">
                Choose the plan that works for you!
                <br />
                Upgrade, downgrade, cancel anytime.
              </p>
            )}
          </div>
          <div className="container">
            <div
              className={
                isMobile ? '' : 'd-flex justify-content-center flex-row py-4'
              }
            >
              {plans
                ?.sort((a, b) => (a.recommended <= b.recommended ? 1 : -1))
                .map((plan, idx) => {
                  return (
                    <SetupPlanCard
                      key={plan?.id}
                      planCard={plan}
                      active={idx == activePlan}
                      setActive={setActivePlan}
                      index={idx}
                    />
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
