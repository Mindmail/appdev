// import { ImageType } from '@/global.types'
import React, { useEffect } from 'react'
// import { isMobile } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import HistoryItem from '@/components/Dashboard/HistoryItem'
import type { AppState } from '@/store'
import {
  getGratitudeHistoryImages,
  getVisualizationImages,
} from '@/store/actions/images'

const History: React.FC<{
  elementRef: any
  className: any
  historyType: string
}> = ({ elementRef, className, historyType }) => {
  const dispatch = useDispatch()
  const images = useSelector((state: AppState) => state.images.historyImages)
  useEffect(() => {
    if (historyType == 'Gratitude') {
      getGratitudeHistoryImages(dispatch)
    } else {
      getVisualizationImages(dispatch)
    }
  }, [])

  const navigate = useNavigate()
  return (
    <div className={`side-widget-wrapper ${className}`} ref={elementRef}>
      <p className="sub-title text-secondary-color pl-2">
        Your {historyType} History
      </p>
      <div className="side-widget-box">
        <div className="row gratitude-border">
          {images.length ? (
            images.map((history: any, index: any) => {
              return (
                <div key={index} className="col-12">
                  <HistoryItem
                    historyItem={history}
                    historyType={historyType}
                  />
                </div>
              )
            })
          ) : (
            <div className="m-auto px-5 py-3 text-center">
              <p className="paragraph text-gray-color--1">
                You haven’t had any {historyType} practice yet.
              </p>
              <button
                className="paragraph text-gray-color--5 bg-background border-0"
                onClick={() => navigate('/full-cycle/' + historyType)}
              >
                Want to start it now?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default History
