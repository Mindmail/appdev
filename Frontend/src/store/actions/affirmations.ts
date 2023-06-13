import type { Dispatch } from 'redux'

import { apiClientWithToken } from '@/store/apiClient'

// import { UserAffirmationType } from '../../global.types'

import type {
  GetUserAffirmationsType,
  GetAffirmationsErrorType,
} from './action.types'

export const getUserAffirmations = (
  selectedGoal: any,
  dispatch: Dispatch<GetUserAffirmationsType | GetAffirmationsErrorType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .get('/affirmation/answers/' + selectedGoal.goalId)
    .then((res) => {
      dispatch({
        payload: res.data.data,
        type: 'GET_USER_AFFIRMATIONS',
      })
    })
    .catch((err) => {
      dispatch({
        payload: {
          status: err.response.status,
          statustext: err.response.statusText,
        },
        type: 'GET_AFFIRMATIONS_ERROR',
      })
    })
}
