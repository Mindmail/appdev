import React from 'react'
import '@/assets/scss/components/tooltip.scss'

const Tooltip: React.FC<{ icon: any; text?: string; position?: string }> = ({
  icon,
  text = '',
  position = 'right',
}) => {
  return (
    <>
      <div className="InfoIcon">
        {icon}
        <span className={'InfoIcontext InfoIcon-position-' + position}>
          {text}
        </span>
      </div>
    </>
  )
}

export default Tooltip
