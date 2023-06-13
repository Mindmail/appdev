import type { ClientErrorType, GoalType } from '../../global.types'
import type { AppActionTypes } from '../actions/action.types'

const initialState: GoalState = {
  error: {},
  userGoals: [],
}

const goalsReducer = (
  state: GoalState = initialState,
  action: AppActionTypes
): GoalState => {
  let add_goals, remove_goals
  switch (action.type) {
    case 'GET_GOALS':
      return {
        ...state,
        userGoals: action.payload,
      }
    case 'ADD_GOAL':
      add_goals = state.userGoals.map((item) => {
        if (item.goalId == action.payload.goalId) {
          return {
            ...item,
            caption: action.payload.default_caption,
            id: action.payload.id,
          }
        } else return item
      })

      return {
        ...state,
        userGoals: add_goals,
      }
    case 'REMOVE_GOAL':
      remove_goals = state.userGoals.map((item) => {
        if (item.goalId == action.payload.goalId) {
          return { ...item, id: undefined }
        } else return item
      })
      return {
        ...state,
        userGoals: remove_goals,
      }
    case 'ADD_GOAL_FAILED':
      return {
        ...state,
      }
    case 'GOALS_ERROR':
      return {
        ...state,
        userGoals: [],
      }
    default:
      return state
  }
}

export interface GoalState {
  userGoals: GoalType[]
  error: ClientErrorType
}

export default goalsReducer
