import { apiClientWithToken } from '@/store/apiClient'

export const getChatBuddyAvatars = () => {
  return apiClientWithToken(localStorage.getItem('mindmailtoken')).get(
    '/affirmation/chatbuddyavatars'
  )
}

export const getChatBuddyAvatar = () => {
  return apiClientWithToken(localStorage.getItem('mindmailtoken')).get(
    '/affirmation/chatbuddy'
  )
}

export const createChatBuddy = (newData: any) => {
  return apiClientWithToken(localStorage.getItem('mindmailtoken')).post(
    '/affirmation/chatbuddy',
    newData
  )
}

export const updateChatBuddy = (data: any) => {
  // console.log(data)
  return apiClientWithToken(localStorage.getItem('mindmailtoken')).put(
    '/affirmation/chatbuddy/' + data.id,
    data
  )
}
