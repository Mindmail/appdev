import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { isMobile } from 'react-device-detect'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

import Advertising from '@/components/Dashboard/Advertising'
import GratitudeFolder from '@/components/Dashboard/GratitudeFolder'
import History from '@/components/Dashboard/History'

// import UserAvatar from '@/components/Dashboard/UserAvatar'
// import { AppState } from '@/store'
// import { getUserImages, deleteUserImage } from '@/store/actions/images'
import DashboardLayout from '../Layout/DashboardLayout'
import TopBar from '../Layout/TopBar'
import '@/assets/scss/pages/dashboard/gratitude.scss'

const GratitudeHome: React.FC = () => {
  const [size, setSize] = useState({ height: 0, width: 0 })

  const dashboardLeftElement = useRef(document.createElement('div'))
  const gratitudeElement = useRef(document.createElement('div'))
  const historyElement = useRef(document.createElement('div'))
  // const navigate = useNavigate()
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize({ height: window.innerHeight, width: window.innerWidth })
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

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
  }, [size])

  // const userImageCallback = (images: any) => {
  //   const data: any = []
  //   images.forEach((image: any) => {
  //     data.push({
  //       datetime: '12m ago',
  //       id: image.id,
  //       isGratitude: image.isGratitude,
  //       isVisualization: image.isVisualization,
  //       src: image.photoURL,
  //       state: image.state,
  //       title: image.description,
  //     })
  //   })
  //   // console.log('first');
  //   // console.log(data);
  // }

  return (
    <DashboardLayout
      sideComponent={
        <>
          <GratitudeFolder
            elementRef={gratitudeElement}
            className="gratitude-folder-wrapper"
            isGratitude={1}
          />
          <History
            elementRef={historyElement}
            className="history-item-wrapper"
            historyType="Gratitude"
          />
        </>
      }
      ref={dashboardLeftElement}
    >
      <TopBar
        title="Gratitude"
        description="Be grateful about what you have and what you haven’t had. They will keep you moving towards your goals!"
        tooltip="Based on scientific research, an affirmation can work very well when people not only say the affirmation in present tense but also share their affirmations in conversation."
      />
      <Advertising title="Gratitude Practice" description="Gratitude" />
      <div className="mobile-dashboard mt-5">
        <GratitudeFolder
          elementRef={gratitudeElement}
          className="gratitude-folder-wrapper"
          isGratitude={1}
        />
      </div>
      <div className="mobile-dashboard mt-5">
        <History
          elementRef={historyElement}
          className="history-item-wrapper"
          historyType="Gratitude"
        />
      </div>
      {/* <div className="ProcessesCircleSvg mt-3">
        <div className="d-block w-100 px-3">
          <Slider {...settings}>
            <SlickItem>
              <img src={image1} alt="" className="slick-image" />
            </SlickItem> // * 8
          </Slider>
        </div>
        <p
          className={`${
            isMobile ? "mt-1" : " mt-8"
          } paragraph text-center text-secondary-color px-5`}
        >
          Embrace the photos/videos that you are grateful for in your life
          now by practicing Gratitude now!
        </p>
        <button
          className={`${
            isMobile ? "mt-1" : ""
          } btn btn-sm mindmail-button button-primary button-label px-5`}
          onClick={handleActivateGratitude}
        >
          Activate Gratitude
        </button>
      </div> */}
    </DashboardLayout>
  )
}

export default GratitudeHome
