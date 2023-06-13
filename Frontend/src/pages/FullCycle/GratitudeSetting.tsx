import Stepper from 'bs-stepper'
import React, { useRef, useEffect, useState } from 'react'
import 'bs-stepper/dist/css/bs-stepper.min.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import GratitudeItem from '@/components/Gratitude/GratitudeItem'
import type { AppState } from '@/store'
import { getGratitudeImages } from '@/store/actions/images'
// import { apiClientWithToken } from '@/store/apiClient'

interface GratitudeItem {
  id: number
  photo: string
  title: string
  timeFrame: string
  musicurl: string
}

const Affirmation: React.FC = () => {
  const [gratitude, setGratitude] = useState<GratitudeItem[]>([])
  const setupRef = useRef(document.createElement('div'))
  const navigate = useNavigate()
  let stepper: any = null
  const dispatch = useDispatch()

  const gratitudeImages = useSelector((state: AppState) => state.images.images)

  useEffect(() => {
    getGratitudeImages(dispatch)
  }, [])

  useEffect(() => {
    const data = gratitudeImages.map((item: any): GratitudeItem => {
      return {
        id: item.id,
        musicurl: item.musicURL,
        photo: item.photoURL,
        timeFrame: item.musictime,
        title: item.musicname,
      }
    })
    setGratitude(data)
  }, [gratitudeImages])

  useEffect(() => {
    stepper = new Stepper(setupRef.current, {
      animation: true,
      linear: false,
    })
  }, [setupRef, gratitude])

  const handleNextClick = () => {
    if (stepper) {
      stepper.next()
    }
  }

  const handleFinish = () => navigate('/full-cycle/visualization-start')

  return (
    <div className="container-fluid page-container d-flex flex-column">
      <h3 className="page-title text-secondary-color mb-3 text-center">
        Write down what you are grateful for…{' '}
      </h3>
      <div>
        <div id="stepperID" className="bs-stepper" ref={setupRef}>
          <div
            className="bs-stepper-header position-absolute invisible"
            role="tablist"
          >
            {gratitude.map((item) => {
              return (
                <div
                  key={item.id}
                  className="step"
                  data-target={`#gratitude-${item.id}`}
                >
                  <button
                    type="button"
                    className="step-trigger"
                    role="tab"
                    aria-controls={`gratitude-${item.id}`}
                    id={`gratitude-${item.id}-trigger`}
                  >
                    <span className="custom-bs-stepper-circle">
                      <span className="number">1</span>
                    </span>
                  </button>
                </div>
              )
            })}
          </div>

          <div className="bs-stepper-content">
            {gratitude.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  id={`gratitude-${item.id}`}
                  className="content container"
                  role="tabpanel"
                  aria-labelledby={`gratitude-${item.id}-trigger`}
                >
                  <div className="w-100 ml-auto mr-auto">
                    <GratitudeItem
                      stepper={stepper}
                      item={item}
                      handleNext={
                        idx + 1 >= gratitude.length
                          ? handleFinish
                          : handleNextClick
                      }
                    />
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
