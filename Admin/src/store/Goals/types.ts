export const GET_GOALS = "GET_GOALS";
export const GOALS_ERROR = "GOALS_ERROR";

interface GetGoalsAction {
  type: typeof GET_GOALS;
  payload: any;
}
interface GoalsErrorAction {
  type: typeof GOALS_ERROR;
  payload: any;
}

export type GoalsActions =
  | GetGoalsAction
  | GoalsErrorAction;
