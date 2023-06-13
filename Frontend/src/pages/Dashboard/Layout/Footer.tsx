import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className="footer label font-weight-600 background-transparent p-4 text-center">
      © {new Date().getFullYear()} Mindmail. All rights reserved.
    </div>
  )
}

export default Footer
