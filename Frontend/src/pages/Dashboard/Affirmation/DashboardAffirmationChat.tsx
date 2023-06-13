import React from 'react'
// import Alert from 'react-bootstrap/Alert'

import AffirmationChat from '@/components/AffirmationChat'

const DashboardAffirmationChat: React.FC<{
  selectedGoal: any
  setAffirmationChat: any
}> = (/*{ selectedGoal, setAffirmationChat }*/) => {
  // const handleNextClick = (state: number) => {
  //   setAffirmationChat(state)
  // }

  return (
    // <div></div>
    <AffirmationChat
    // selectedGoal={selectedGoal}
    // setAffirmationChat={setAffirmationChat}
    ></AffirmationChat>
  )
}

export default DashboardAffirmationChat
