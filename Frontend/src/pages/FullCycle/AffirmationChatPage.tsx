// import axios from 'axios'
import React, { useCallback, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
// import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate } from 'react-router-dom'

import chattingGif from '@/assets/images/loading_dots.gif'
import AffirmationChat from '@/components/AffirmationChat'
import type { ChatType } from '@/global.types'
import { apiClientWithToken } from '@/store/apiClient'

const Avatar = () => (
  <div className="position-relative d-flex flex-column justify-content-center medium-circle bg-gray-color--3 mr-2 text-center">
    <p
      className="label text-secondary-color mb-auto mt-auto"
      style={{ width: '100%' }}
    >
      Abby
    </p>
    <i className="online-status" />
  </div>
)
const AffirmationChatPage: React.FC = () => {
  const navigate = useNavigate()
  // const chatEndRef = useRef<HTMLDivElement>()
  const [chats, setChats] = useState<ChatType[]>([])
  // const [parent, setParent] = useState<number>(0)
  const [chatting, setChatting] = useState<boolean>(false)

  const handleNextClick = useCallback(
    () => navigate('/full-cycle/celebration'),
    [history]
  )

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

  const handleSubmitChat = (side: string, message: string) => {
    setChats((prevChats) => [...prevChats, { message, side }])
    setChatting(true)
    getResponseFromBot([...chats, { message, side }])
  }

  // const goToDashboard = useCallback(
  //   () => navigate('/dashboard/home'),
  //   [history]
  // )
  // const addChat = (item: any) => {
  //   setChats((old) => [...old, item])
  //   return item
  // }
  // const handleMessageClick = (item: any) => {
  //   if (item.id > parent) {
  //     // addChat({ chat: true, content: item.value, me: true })
  //     setParent(item.id)
  //   }
  // }
  // useEffect(() => {
  //   setChatting(true)
  //   axios
  //     .get(`http://localhost:8081?qid=${parent}`, {
  //       headers: {
  //         'Access-Control-Allow-Methods': 'GET',
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     })
  //     .then((res: any) => {
  //       if (!res.data) return
  //       setTimeout(() => {
  //         if (res.data.question)
  //           // addChat({ chat: true, content: res.data.question.value, me: false })
  //         if (res.data.answers)
  //           // addChat({ chat: false, items: res.data.answers, me: false })
  //         // setChats((chats: any) => [...chats, res.data.answers.map((item: any) => (
  //         //   {
  //         //     chat: false, c
  //         //   }
  //         // ))])
  //         setChatting(false)
  //       }, 1000)
  //     })
  //     .catch(() => {
  //       setChatting(false)
  //     })
  // }, [parent])

  // useEffect(() => {
  //   if (chatEndRef.current && typeof chatEndRef.current !== 'undefined') {
  //     chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
  //   }
  // }, [chats])

  return (
    <div className="container-fluid dashboard-page-container d-flex flex-column justify-content-between launch-goal">
      <AffirmationChat
        handleNext={handleNextClick}
        handleChat={handleSubmitChat}
      >
        <div className="d-flex">
          <Avatar />
          <div>
            <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
              OK! Let's start manifesting
            </Alert>
            <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
              First, choose the affirmation you'd like to use this affirmation
              cycle
            </Alert>
            <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
              Now can you type out the "work goals" that you have minds?
            </Alert>
            {chats.map((chat) => {
              return (
                <Alert className="paragraph bg-gray-color--3 text-secondary-color from-bot">
                  {chat.message}
                </Alert>
              )
            })}
          </div>
        </div>
        <div className={`chatting-gif ${chatting ? 'visible' : 'invisible'}`}>
          <img src={chattingGif} alt="" width={36} />
        </div>
        {/*<div className="d-flex justify-content-end flex-row">
          <Alert className="paragraph bg-gray-color--3 text-secondary-color">
            Now can ou type out the "work goals" that you have minds?
          </Alert>
        </div> */}
        {/* {chats.map((item: any, index: number) => (
          <div key={index}>
            {item.chat && (
              <div className={`d-flex`} key={index}>
                <Avatar />
                <Alert
                  className={`paragraph bg-gray-color--3 text-secondary-color from-bot`}
                >
                  {item?.content}
                </Alert>
              </div>
            )}
            {!item.chat && (
              <ListGroup className="margin-bottom-sm">
                {item.items.map((_item: any, index: number) => (
                  <ListGroup.Item className="text-secondary-color bg-white p-1 pr-6">
                    <button
                      key={index}
                      onClick={() => handleMessageClick(_item)}
                    >
                      {_item.value}
                    </button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        ))}
        <div className={`chatting-gif ${chatting ? 'visible' : 'invisible'}`}>
          <img src={chattingGif} alt="" width={36} />
        </div>
        <div ref={chatEndRef} /> */}
      </AffirmationChat>
      {/* <AffirmationChat selectedGoal={null}></AffirmationChat> */}
      {/* <div className="w-50 mx-auto text-center">
        <button
          type="button"
          className="btn-block button-label btn btn-sm mindmail-button button-primary mx-auto px-4"
          onClick={handleNextClick}
        >
          Yes, please, can’t wait!
        </button>
        <button
          type="button"
          className="btn-block button-label button-outline btn btn-sm mindmail-button mt-3"
          onClick={goToDashboard}
        >
          I want to exit from this cycle.
        </button>
      </div> */}
    </div>
  )
}

export default AffirmationChatPage
