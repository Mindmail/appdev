import Stepper from 'bs-stepper'
import React, { useRef, useEffect, useState, Fragment } from 'react'
import '@/assets/scss/pages/user-setup/affirmation.scss'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import { ProgressBar } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import { isMobile } from 'react-device-detect'
import { BsCheck } from 'react-icons/bs'
// import { useDispatch } from 'react-redux'

import AffirmationChat from '@/components/AffirmationChat'

import AffirmationChatBuddy from './AffirmationChatBuddy'
import GratitudeVisualizationSetup from './setup/GratitudeVisualization'
import SetupAffirmation from './SetupAffirmation'

const Affirmation: React.FC = () => {
  // const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(1)
  const setupRef = useRef(document.createElement('div'))
  const [stepper, setStepper] = useState<any>(null)

  useEffect(() => {
    const new_stepper = new Stepper(setupRef.current, {
      animation: true,
      linear: false,
    })
    setStepper(new_stepper)
  }, [setupRef])

  const handleNextClick = () => {
    if (isMobile) {
      setCurrentStep(currentStep + 1)
    } else {
      if (stepper) {
        stepper.next()
      }
    }
  }

  const steps = [
    {
      child: (
        <SetupAffirmation stepper={stepper} handleNext={handleNextClick} />
      ),
      id: 1,
      target: 'setup-goals',
      title: 'Setup your goals',
      trigger: 'setup-goals-trigger',
    },
    {
      child: (
        <AffirmationChatBuddy stepper={stepper} handleNext={handleNextClick} />
      ),
      id: 2,
      target: 'affirmation-chat-buddy',
      title: 'Setup your affirmation chat buddy',
      trigger: 'affirmation-chat-buddy-trigger',
    },
    {
      child: (
        <AffirmationChat stepper={stepper} handleNext={handleNextClick}>
          <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
            OK! First things, let's convert your goals into affirmations
          </Alert>
          <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
            Let's start with you 'work' goal. Please write out your goal in as
            few words as possible. E.g "I want to be promoted"
          </Alert>
        </AffirmationChat>
      ),
      id: 3,
      target: 'affirmation-setup',
      title: 'Setup your affirmation',
      trigger: 'affirmation-setup-trigger',
    },
    {
      child: <GratitudeVisualizationSetup />,
      id: 4,
      target: 'visualizations',
      title: 'Prepare your Gratitude and Visualization',
      trigger: 'visualizations-trigger',
    },
  ]
  return (
    <div className="affirmation-container container-fluid page-container d-flex flex-column">
      <div className={isMobile ? '' : 'margin-top-lg'}>
        <div id="stepperID" className="bs-stepper" ref={setupRef}>
          <div className="bs-stepper-header" role="tablist">
            {steps.map((step) => {
              return (
                <Fragment key={step.id}>
                  <div
                    className={'step' + (isMobile ? ' d-none ' : '')}
                    data-target={'#' + step.target}
                    key={step.id}
                  >
                    <button
                      type="button"
                      className="step-trigger"
                      role="tab"
                      aria-controls={step.target}
                      id={step.trigger}
                      // disabled
                      onClick={() => setCurrentStep(step.id)}
                    >
                      <span className="custom-bs-stepper-circle">
                        <span className="number">{step.id}</span>
                        <span className="check">
                          <BsCheck size="20" />
                        </span>
                      </span>
                      <span className="bs-stepper-label sub-title text-primary-color font-normal">
                        {step.title}
                      </span>
                    </button>
                  </div>
                  <div
                    className={
                      !isMobile
                        ? ' d-none '
                        : currentStep == step.id
                        ? 'step-mobile'
                        : ' d-none '
                    }
                  >
                    <div className="step-mobile-title">{step.title}</div>
                    <div className="step-mobile-progress">
                      <ProgressBar now={(step.id / 4) * 100} />
                      <span>Step {step.id}/4</span>
                    </div>
                  </div>
                  {step.id < 4 && (
                    <div className={'line' + (isMobile ? ' d-none ' : '')} />
                  )}
                </Fragment>
              )
            })}
          </div>

          <div className="bs-stepper-content">
            {steps.map((step, idx) => {
              return (
                <div
                  id={step.target}
                  className={
                    'content ' +
                    (isMobile
                      ? step.id == currentStep
                        ? 'd-block'
                        : 'd-none'
                      : '')
                  }
                  role="tabpanel"
                  aria-labelledby={step.trigger}
                  key={idx}
                >
                  <div
                    className={
                      ' ml-auto mr-auto ' +
                      (isMobile ? ' margin-top-xl mb-2 ' : ' margin-top-lg')
                    }
                  >
                    {step.child}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Affirmation
