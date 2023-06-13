import type { Dispatch } from 'redux'

import { apiClientWithToken } from '@/store/apiClient'

import type { GoalType } from '../../global.types'

import type {
  AddGoalType,
  GetGoalsType,
  RemoveGoalType,
  GoalsErrorType,
  AddGoalFailedType,
  RemoveGoalFailedType,
} from './action.types'

export const getUserGoals = (
  dispatch: Dispatch<GetGoalsType | GoalsErrorType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .get('/affirmation/goals')
    .then((res) => {
      dispatch({
        payload: res.data.data,
        type: 'GET_GOALS',
      })
    })
    .catch((err) => {
      dispatch({
        payload: err.response,
        type: 'GOALS_ERROR',
      } as GoalsErrorType)
    })
}

export const addUserGoal = (
  data: GoalType,
  dispatch: Dispatch<AddGoalType | AddGoalFailedType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .post('/affirmation/goal', data)
    .then((res) => {
      data.id = res.data.id
      dispatch({
        payload: data,
        type: 'ADD_GOAL',
      })
    })
    .catch(() => {
      dispatch({
        type: 'ADD_GOAL_FAILED',
      })
    })
}

export const updateUserGoal = (
  data: any,
  dispatch: Dispatch<GetGoalsType | GoalsErrorType | AddGoalFailedType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .put(`/affirmation/goal/${data.id}`, data)
    .then(() => {
      getUserGoals(dispatch)
    })
    .catch(() => {
      dispatch({
        type: 'ADD_GOAL_FAILED',
      })
    })
}

export const removeUserGoal = (
  data: any,
  dispatch: Dispatch<RemoveGoalType | RemoveGoalFailedType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .delete(`/affirmation/goal/${data.id}`)
    .then(() => {
      dispatch({
        payload: data,
        type: 'REMOVE_GOAL',
      })
    })
    .catch(() => {
      dispatch({
        type: 'REMOVE_GOAL_FAILED',
      })
    })
}
