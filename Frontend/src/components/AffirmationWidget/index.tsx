import React from 'react'
import '@/assets/scss/components/affirmation-widget.scss'

const AffirmationWidget: React.FC<{ icon: any; title: any; text: string }> = ({
  icon,
  title,
  text,
}) => {
  return (
    <div className="affirmation-item">
      <p className="affirmation-icon">{icon}</p>
      <h3 className="affirmation-title">{title}</h3>
      <p className="affirmation-text">{text}</p>
    </div>
  )
}

export default AffirmationWidget
