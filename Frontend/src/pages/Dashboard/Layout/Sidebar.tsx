import React from 'react'
import { isMobile } from 'react-device-detect'
import { FaCog, FaHome, FaPrayingHands } from 'react-icons/fa'
import { useLocation, useNavigate, Link } from 'react-router-dom'

import AffirmationIcon from '@/assets/icons/AffirmationIcon'
import { LogoBig } from '@/assets/icons/LogoBig'
import SignOutIcon from '@/assets/icons/SignOutIcon'
import VisualizationIcon from '@/assets/icons/VisualizationIcon'

const links = [
  { icon: <FaHome size={32} />, label: 'Home', url: 'home' },
  {
    icon: <AffirmationIcon width={32} height={32} />,
    label: 'Affirmation',
    url: `affirmation`,
  },
  {
    icon: <FaPrayingHands size={32} />,
    label: `Gratitude`,
    url: `gratitude`,
  },
  {
    icon: <VisualizationIcon width={32} height={32} />,
    label: `Visualization`,
    url: `visualization`,
  },
  { icon: <FaCog size={32} />, label: `Settings`, url: `settings` },
]

const Sidebar: React.FC<{ handleClose?: AnyFunction }> = ({ handleClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const handleLogout = () => {
    localStorage.removeItem('mindmailtoken')
    navigate('/')
  }
  const pathList = location.pathname.split('/')
  const currentPath = pathList[1]

  return (
    <div className="side-menu">
      <div className="logo">
        <Link to="/">
          <LogoBig width="56" height="56" />
        </Link>
      </div>
      <ul className="nav-menu">
        {links.map((link: any, index: number) => (
          <li
            className={`nav-item ${currentPath == link.url && 'active'}`}
            key={index}
          >
            <button
              className="w-100 border-0 bg-transparent"
              onClick={handleClose}
            >
              <Link to={`/${currentPath}/${link.url}`}>
                {link.icon}
                <p>{link.label}</p>
              </Link>
            </button>
          </li>
        ))}
        <li className="nav-item signout">
          <button
            onClick={handleLogout}
            className="border-0 bg-transparent text-white"
          >
            <SignOutIcon width={32} height={32} />
            <p>Log Out</p>
          </button>
        </li>
      </ul>
      {isMobile && (
        <div className="link-footer" style={{ marginTop: '50%' }}>
          <button className="font-size-12 mr-2 border-0 bg-transparent text-black">
            Privacy
          </button>
          <button className="font-size-12 mr-2 border-0 bg-transparent text-black">
            |
          </button>
          <button className="font-size-12 mr-2 border-0 bg-transparent text-black">
            Terms
          </button>
          <button className="font-size-12 mr-2 border-0 bg-transparent text-black">
            |
          </button>
          <button className="font-size-12 mr-2 border-0 bg-transparent text-black">
            FAQ
          </button>
        </div>
      )}
    </div>
  )
}

export default Sidebar
