import type { ClientErrorType } from '../../global.types'
// import { ImageType } from '../../global.types'
import type { AppActionTypes } from '../actions/action.types'

const initialState: BuddyState = {
  error: {},
  userbuddy: {
    photoURL: '/slidingImage6.png',
    username: 'Steven',
  },
}

const buddyReducer = (
  state: BuddyState = initialState,
  action: AppActionTypes
): BuddyState => {
  switch (action.type) {
    default:
      return state
  }
}

export interface BuddyState {
  userbuddy: {
    photoURL: string
    username: string
  }
  error: ClientErrorType
}

export default buddyReducer
