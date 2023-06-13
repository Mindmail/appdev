import React from 'react'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'

interface params {
  header_1?: string
  header_2?: string
  children?: React.ReactNode
}

const Setup: React.FC<params> = ({ children, header_1, header_2 }) => {
  return (
    <section className="setup-page">
      <div className="mt-3 text-center">
        <h4 className={`page-title text-secondary-color`}>{header_1}</h4>
        <h4
          className={`${
            isMobile
              ? 'paragraph text-gray-color--1 pt-4 text-left'
              : 'big-sub-title text-secondary-color'
          } `}
        >
          {header_2}{' '}
        </h4>
      </div>
      {children}
      <div className="d-flex justify-content-center pb-4 pt-2">
        <div className="text-center">
          <Link
            className="text-primary-color button-label underlined cursor-pointer"
            to="/dashboard/home/skip-upload"
          >
            I will skip the set up
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Setup
