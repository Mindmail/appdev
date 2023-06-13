import React from 'react'

import CreditCardForm from '@/components/CreditCardForm'

import '@/assets/scss/pages/user-setup/credit-card.scss'

const CreditCard: React.FC = () => {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center">
      <CreditCardForm />
    </div>
  )
}

export default CreditCard
