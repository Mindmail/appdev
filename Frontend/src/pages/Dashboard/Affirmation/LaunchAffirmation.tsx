import React, { useCallback, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'

// import ChatBot from 'react-simple-chatbot'
import chattingGif from '@/assets/images/loading_dots.gif'
import AffirmationChat from '@/components/AffirmationChat'
import type { ChatType } from '@/global.types'
import { apiClientWithToken } from '@/store/apiClient'

const LaunchAffirmation: React.FC = () => {
  const navigate = useNavigate()
  const [chats, setChats] = useState<ChatType[]>([])
  const [chatting, setChatting] = useState<boolean>(false)

  const getResponseFromBot = async (chats: ChatType[]) => {
    await apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .post('/affirmation/chatbot', { chats })
      .then((res) => {
        // localStorage.setItem('mindmailtoken', res.data.token)
        setChatting(false)
        if (res.data.type && res.data.message) {
          setChats((prevChats) => [
            ...prevChats,
            { message: res.data.message, side: 'bot' },
          ])
        }
      })
      .catch((err) => {
        if (err.response === undefined) {
          // setAlertString('something went wrong')
        } else {
          // setAlertString(err.response.data.message)
        }
        setChatting(false)
      })
  }

  const handleNextClick = useCallback(
    () => navigate('/dashboard/affirmation'),
    [history]
  )

  const handleSubmitChat = (side: string, message: string) => {
    setChats((prevChats) => [...prevChats, { message, side }])
    setChatting(true)
    getResponseFromBot([...chats, { message, side }])
  }

  return (
    <div className="container-fluid dashboard-page-container d-flex flex-column justify-content-between launch-goal">
      <AffirmationChat
        handleNext={handleNextClick}
        handleChat={handleSubmitChat}
      >
        <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
          OK! First things, let's convert your goals into affirmations
        </Alert>
        <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
          Let's start with you 'work' goal. Please write out your goal in as few
          words as possible. E.g "I want to be promoted"
        </Alert>
        {chats.map((chat) => {
          return (
            <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
              {chat.message}
            </Alert>
          )
        })}
        <div className={`chatting-gif ${chatting ? 'visible' : 'invisible'}`}>
          <img src={chattingGif} alt="" width={36} />
        </div>
      </AffirmationChat>
    </div>
  )
}

export default LaunchAffirmation
