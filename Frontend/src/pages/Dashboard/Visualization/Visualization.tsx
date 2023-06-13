import React, { useEffect, useRef } from 'react'
import { isMobile } from 'react-device-detect'

import Advertising from '@/components/Dashboard/Advertising'
import GratitudeFolder from '@/components/Dashboard/GratitudeFolder'
import History from '@/components/Dashboard/History'

import DashboardLayout from '../Layout/DashboardLayout'
import TopBar from '../Layout/TopBar'
import '@/assets/scss/pages/dashboard/gratitude.scss'

const DashboardVisualization: React.FC = () => {
  const dashboardLeftElement = useRef(document.createElement('div'))
  const gratitudeElement = useRef(document.createElement('div'))
  const historyElement = useRef(document.createElement('div'))

  useEffect(() => {
    if (!isMobile) {
      historyElement.current.style.height = '0'
      historyElement.current.style.height = `${(
        dashboardLeftElement.current?.offsetHeight -
        gratitudeElement.current?.offsetHeight -
        140
      ).toString()}px`
    } else {
      historyElement.current.style.height = '100vh'
    }
  }, [gratitudeElement])

  // const userImageCallback = (images: any) => {
  //   // console.log(images)
  //   const data: any = []
  //   images.forEach((image: any) => {
  //     if (image.isVisualization) {
  //       data.push({
  //         datetime: '12m ago',
  //         id: image.id,
  //         isGratitude: image.isGratitude,
  //         isVisualization: image.isVisualization,
  //         src: image.photoURL,
  //         state: image.state,
  //         title: image.description,
  //       })
  //     }
  //   })
  // }

  // const handleVisualization = () => {
  //   navigate('/full-cycle/visualization')
  // }
  return (
    <DashboardLayout
      ref={dashboardLeftElement}
      sideComponent={
        <>
          <GratitudeFolder
            elementRef={gratitudeElement}
            className="gratitude-folder-wrapper"
            isGratitude={0}
          />
          <History
            elementRef={historyElement}
            className="history-item-wrapper"
            historyType="Visualization"
          />
        </>
      }
    >
      <TopBar
        title="Visualization"
        description="Visualize your goals in automated video-slides empower your believes"
        tooltip="Based on scientific research, an affirmation can work very well when people not only say the affirmation in present tense but also share their affirmations in conversation."
      />
      <Advertising title="Visualization Practice" description="Visualization" />
      <div className="mobile-dashboard mt-5">
        <GratitudeFolder
          elementRef={gratitudeElement}
          className="gratitude-folder-wrapper"
          isGratitude={0}
        />
      </div>
      <div className="mobile-dashboard mt-5">
        <History
          elementRef={historyElement}
          className="history-item-wrapper"
          historyType="Visualization"
        />
      </div>
      {/* <div className="ProcessesCircleSvg mt-3">
            <div className="d-flex w-50">
              <img src={image1} alt="" />
            </div>
            <p
              className={`${
                isMobile ? "mt-1" : " mt-8"
              } paragraph text-center text-secondary-color px-5`}
            >
              Visualize what you want to have in your life now
            </p>
            <button
              className={`${
                isMobile ? "mt-1" : ""
              } btn btn-sm mindmail-button button-primary button-label px-5`}
              onClick={handleVisualization}
            >
              Start Visualising
            </button>
          </div> */}
    </DashboardLayout>
  )
}

export default DashboardVisualization
