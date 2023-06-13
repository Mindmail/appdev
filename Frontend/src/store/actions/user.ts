// import { Dispatch } from 'redux'

import { apiClientWithToken } from '@/store/apiClient'

// import { GoalType } from '../../global.types'

export const getAllUserInfo = () => {
  return apiClientWithToken(localStorage.getItem('mindmailtoken')).get(
    '/user/info'
  )
}

export const updateUserInfo = (data: any) => {
  return apiClientWithToken(localStorage.getItem('mindmailtoken')).put(
    `/user/profile`,
    data
  )
}

export const updateUserBuddy = (data: any) => {
  return apiClientWithToken(localStorage.getItem('mindmailtoken')).put(
    `/user/buddy/${data.buddyId}`,
    data
  )
}

export const updateUserNotification = (data: any) => {
  return apiClientWithToken(localStorage.getItem('mindmailtoken')).put(
    `/user/nitification/${data.id}`,
    data
  )
}

export const deleteUserAccount = () => {
  return apiClientWithToken(localStorage.getItem('mindmailtoken')).delete(
    `/user/account`
  )
}
