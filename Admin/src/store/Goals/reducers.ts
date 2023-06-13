import { GoalsActions, GET_GOALS, GOALS_ERROR } from "./types";

interface BuddyAvatarReducerState {
  goals: any;
}

const GoalsReducer = (
  state: BuddyAvatarReducerState = {
    goals: [],
  },
  action: GoalsActions
): BuddyAvatarReducerState => {
  switch (action.type) {
    case GET_GOALS:
      return {
        ...state,
        goals: action.payload,
      };
    case GOALS_ERROR:
      return {
        ...state,
        goals: [],
      };
    default:
      return state;
  }
};

export default GoalsReducer;
