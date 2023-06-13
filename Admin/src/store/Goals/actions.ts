import { GET_GOALS, GOALS_ERROR, GoalsActions } from "./types";
import { Dispatch } from "redux";
import { apiClientwithToken } from "../apiClient";

export interface GoalType {
  id?: number;
  goalId: number;
  type: string;
  caption?: string;
  default_caption: string;
  question: string;
  answer: string;
  selected: boolean;
}

export const getGoals = () => {
  return apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
      .get("/admin/goals")
      
}

export const addGoal = (data: any) => {
  console.log(data);
  return apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
      .post("/admin/goal", data)
      
}

export const updateGoal = (data: any) => {
  return apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
      .put("/admin/goal/" + data.id, data)
}

export const deleteGoal = (data: any) => {
  return apiClientwithToken(localStorage.getItem("mindmail_admin_token"))
      .delete("/admin/goal/" + data.id)
}