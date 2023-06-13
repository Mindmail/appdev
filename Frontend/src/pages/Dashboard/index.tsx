import React, { useState } from 'react'
import { IoMenuOutline, IoMdClose } from 'react-icons/all'
import { Navigate, Route, Routes as Switch } from 'react-router-dom'

import { withSuspense } from '@/App'
import PrivateRoute from '@/components/PrivateRoute'

import Footer from './Layout/Footer'
import Sidebar from './Layout/Sidebar'
import '@/assets/scss/pages/dashboard/home.scss'

//
// import { useDispatch } from 'react-redux'
//

const HomePage = React.lazy(() => import('./Home'))

const AffirmationPage = React.lazy(() => import('./Affirmation'))

const GratitudePage = React.lazy(() => import('./Gratitude'))

const VisualizationPage = React.lazy(() => import('./Visualization'))

const ActivityRecord = React.lazy(() => import('./ActivityRecord'))

const SettingsPage = React.lazy(() => import('./Settings'))

const DesktopLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="container-fluid dashboard-page-container align-items-center justify-content-center dashboard-wrapper d-none d-md-block">
    <Sidebar />
    <div className="dashboard-content-wrapper">{children}</div>
  </div>
)

const MobileLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const dispatch = useDispatch()
  const [collapse, setCollapse] = useState<boolean>(true)
  const handleCollapseMenu = () => {
    setCollapse(!collapse)
  }

  return (
    <div className="container-fluid dashboard-page-container align-items-center justify-content-center dashboard-wrapper d-md-none">
      <button
        className={`${
          collapse ? 'open-button' : 'close-button'
        } mobile-collapse-button text-primary-color border-0 bg-transparent`}
        onClick={() => handleCollapseMenu()}
      >
        {collapse ? <IoMenuOutline size={24} /> : <IoMdClose size={24} />}
      </button>
      {!collapse && <Sidebar handleClose={handleCollapseMenu} />}
      <div className="dashboard-content-wrapper">{children}</div>
      <Footer />
    </div>
  )
}

const Routes: React.FC = () => (
  <Switch>
    {/* <Redirect exact from="/dashboard" to="/dashboard/home" /> */}
    <Route path="" element={<Navigate to="/dashboard/home" />} />
    <Route path="*" element={<Navigate to="/dashboard/home" />} />
    <Route path="*/" element={<Navigate to="/dashboard/home" />} />
    <Route
      path={`home/skip-intro`}
      element={withSuspense(<PrivateRoute element={<HomePage />} />)}
    />
    <Route
      path={`home/skip-affirmation`}
      element={withSuspense(<PrivateRoute element={<HomePage />} />)}
    />
    <Route
      path={`home/skip-gratitude`}
      element={withSuspense(<PrivateRoute element={<HomePage />} />)}
    />
    <Route
      path={`home/skip-upload`}
      element={withSuspense(<PrivateRoute element={<HomePage />} />)}
    />
    <Route
      index={true}
      path={`home`}
      element={withSuspense(<PrivateRoute element={<HomePage />} />)}
    />
    <Route
      path={`activity-record`}
      element={withSuspense(<PrivateRoute element={<ActivityRecord />} />)}
    />
    <Route
      path={`affirmation`}
      element={withSuspense(<PrivateRoute element={<AffirmationPage />} />)}
    />
    <Route
      path={`gratitude`}
      element={withSuspense(<PrivateRoute element={<GratitudePage />} />)}
    />
    <Route
      path={`visualization`}
      element={withSuspense(<PrivateRoute element={<VisualizationPage />} />)}
    />
    <Route
      path={`settings`}
      element={withSuspense(<PrivateRoute element={<SettingsPage />} />)}
    />
  </Switch>
)

const UserSetup: React.FC = () => {
  return (
    <>
      <DesktopLayout>
        <Routes />
      </DesktopLayout>
      <MobileLayout>
        <Routes />
      </MobileLayout>
    </>
  )
}

export default UserSetup
