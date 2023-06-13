import React from 'react'

const FriendReferral: React.FC = () => {
  return (
    <div className="referFriend">
      <div className="description">
        <p className="font-size-12">
          Want to have a bonus one-month free subscription?
        </p>
        <p className="font-size-12">
          Now refer 3 friends to join Mindmail, you can get it!
        </p>
      </div>
      <button className="btn btn-mindmail button-primary btn-sm">
        Refer Friend
      </button>
    </div>
  )
}

export default FriendReferral
