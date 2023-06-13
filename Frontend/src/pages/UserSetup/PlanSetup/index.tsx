import '../../../assets/scss/pages/user-setup/plan-setup.scss'
import React from 'react'

import PlanCards from '../../../components/SetupPlanCards'

const PlanSetup: React.FC = () => {
  return (
    <div className="container-fluid align-items-center justify-content-center">
      <PlanCards />
    </div>
  )
}

export default PlanSetup
