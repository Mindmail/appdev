import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { withSuspense } from '@/App'

// import PrivateRoute from '../../components/PrivateRoute'

const AffirmationChatPage = React.lazy(() => import('./AffirmationChatPage'))
const CelebrationPage = React.lazy(() => import('./CelebrationPage'))
const CelebrationPage1 = React.lazy(() => import('./CelebrationPage1'))
const Gratitude = React.lazy(() => import('./Gratitude'))
const GratitudeSetting = React.lazy(() => import('./GratitudeSetting'))
const VisualizationStart = React.lazy(() => import('./VisualizationStart'))
const Visualization = React.lazy(() => import('./VisualizationPage'))

const VisualizationPreview = React.lazy(() => import('./VisualizationPreview'))

const UserSetup: React.FC = () => {
  return (
    <div className="user-setup">
      <Routes>
        <Route path={`/`} element={withSuspense(<AffirmationChatPage />)} />
        <Route
          path={`/celebration`}
          element={withSuspense(<CelebrationPage />)}
        />
        <Route
          path={`/celebration1`}
          element={withSuspense(<CelebrationPage1 />)}
        />
        <Route path={`/gratitude`} element={withSuspense(<Gratitude />)} />
        <Route
          path={`/gratitude-setting`}
          element={withSuspense(<GratitudeSetting />)}
        />
        <Route
          path={`/visualization-start`}
          element={withSuspense(<VisualizationStart />)}
        />
        <Route
          path={`/visualization`}
          element={withSuspense(<Visualization />)}
        />
        <Route
          path={`/visualization-preview`}
          element={withSuspense(<VisualizationPreview />)}
        />
      </Routes>
    </div>
  )
}

export default UserSetup
