/* eslint-disable prettier/prettier */
import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Loading from '@/components/Loading'

import 'bootstrap/dist/css/bootstrap.css'
import './assets/scss/app.scss'
import PrivateRoute from './components/PrivateRoute'
// const UserSetup = React.lazy(() => import('./pages/UserSetup'))
import UserSetup from './pages/UserSetup'
const FullCycle = React.lazy(() => import('./pages/FullCycle'))

const Dashboard = React.lazy(() => import('./pages/Dashboard'))

const LaunchGoal = React.lazy(() => import('./pages/Dashboard/Home/LaunchGoal'))

const LaunchAffirmation = React.lazy(
  () => import('./pages/Dashboard/Affirmation/LaunchAffirmation')
)

const AffirmationComplete = React.lazy(
  () => import('./pages/Dashboard/Affirmation/Complete')
)

export const withSuspense = (Component: React.ReactNode) => {
  return <Suspense fallback={<Loading />}>{Component}</Suspense>
}

const App: React.FC = () => {
  // return <RouterProvider router={router} />
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="" element={<Navigate to="/setup" />} />
          <Route path="/" element={<Navigate to="/setup" />} />
          <Route path="setup/*" element={withSuspense(<UserSetup />)} />
          <Route
            path="/dashboard"
            element={withSuspense(<PrivateRoute element={<Dashboard />} />)}
          />
          <Route
            path="dashboard/*"
            element={withSuspense(<PrivateRoute element={<Dashboard />} />)}
          />
          <Route
            path="/launch-affirmation"
            element={withSuspense(
              <PrivateRoute element={<LaunchAffirmation />} />
            )}
          />
          <Route
            path="full-cycle/*"
            element={withSuspense(
              <PrivateRoute element={withSuspense(<FullCycle />)} />
            )}
          />
          <Route
            path="launch-goal/*"
            element={withSuspense(
              <PrivateRoute element={withSuspense(<LaunchGoal />)} />
            )}
          />
          <Route
            path="launch-affirmation/*"
            element={withSuspense(
              <PrivateRoute element={withSuspense(<LaunchAffirmation />)} />
            )}
          />
          <Route
            path="complete-affirmation/*"
            element={withSuspense(
              <PrivateRoute element={withSuspense(<AffirmationComplete />)} />
            )}
          />
          <Route path="/404" element={<>Error 404: Page not found</>} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
