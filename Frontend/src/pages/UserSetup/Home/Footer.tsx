import { isMobile } from 'react-device-detect'

import { LogoFull } from '@/assets/icons/LogoFull'

import { SocialMedia, Privacy } from './'
export const Footer = () => {
  return (
    <div className="footer py-5">
      <div className="d-flex flex-column d-md-none">
        <div className="col-md-4 footer-1 text-center">
          <Privacy />
        </div>
        <div className="col-md-4 footer-2 text-center">
          <SocialMedia />
        </div>
        <div className="col-md-4 footer-3 cursor-pointer text-center">
          <LogoFull />
        </div>
      </div>

      <div className="d-none d-md-flex row">
        <div className="col-md-4 cursor-pointer">
          <LogoFull />
        </div>
        <div className="col-md-4 text-center">
          <Privacy />
        </div>
        <div className="col-md-4 text-right">
          <SocialMedia />
        </div>
      </div>

      <div className={isMobile ? 'copy-right-mobile' : 'copy-right'}>
        © 2021 Mindmail. All rights reserved.
      </div>
    </div>
  )
}
