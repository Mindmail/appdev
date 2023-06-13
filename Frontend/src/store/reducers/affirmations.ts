import type { ClientErrorType, UserAffirmationType } from '../../global.types'
import type { AppActionTypes } from '../actions/action.types'

const initialState: AffirmationState = {
  error: {},
  user_affirmations: [],
}

const affirmationsReducer = (
  state: AffirmationState = initialState,
  action: AppActionTypes
): AffirmationState => {
  switch (action.type) {
    case 'GET_USER_AFFIRMATIONS':
      return {
        ...state,
        user_affirmations: action.payload,
      }
    default:
      return state
  }
}

export interface AffirmationState {
  user_affirmations: UserAffirmationType[]
  error: ClientErrorType
}

export default affirmationsReducer
