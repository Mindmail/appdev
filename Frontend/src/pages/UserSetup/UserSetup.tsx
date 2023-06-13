import React from 'react'
import {
  Routes,
  Route,
  useNavigate,
  // Outlet
} from 'react-router-dom'

import { withSuspense } from '@/App'
import PrivateRoute from '@/components/PrivateRoute'

const HomePage = React.lazy(() => import('./Home'))

const FreePlan = React.lazy(() => import('./FreeTrial'))

import {
  CreditCard,
  PlanSetup,
  IntroSetup,
  Affirmation,
  AllSet,
  ResetPassword,
  Verification,
} from './'

const UserSetup: React.FC = () => {
  ;(window as any).to = useNavigate()
  // return <Outlet />
  return (
    <>
      <div className="user-setup">
        <Routes>
          <Route path={`password/:token`} element={<ResetPassword />} />

          <Route path={`verify/:token`} element={<Verification />} />

          <Route path={``} element={withSuspense(<HomePage />)} />

          <Route path="/" element={withSuspense(<HomePage />)} />

          <Route path={`signup`} element={withSuspense(<FreePlan />)} />

          <Route
            path="plan"
            element={withSuspense(<PrivateRoute element={<PlanSetup />} />)}
          />
          <Route
            path="card"
            element={withSuspense(<PrivateRoute element={<CreditCard />} />)}
          />
          <Route
            path="intro"
            element={withSuspense(<PrivateRoute element={<IntroSetup />} />)}
          />
          <Route
            path="affirmation"
            element={withSuspense(<PrivateRoute element={<Affirmation />} />)}
          />
          <Route
            path="card"
            element={withSuspense(<PrivateRoute element={<AllSet />} />)}
          />
        </Routes>
      </div>
    </>
  )
}

export default UserSetup
