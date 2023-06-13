import type {
  GoalType,
  UserAffirmationType,
  ClientErrorType,
  ImageType,
} from '../../global.types'
// import { UserInfoType } from '../../global.types'

export interface AddGoalType {
  type: 'ADD_GOAL'
  payload: GoalType
}

export interface GetGoalsType {
  type: 'GET_GOALS'
  payload: GoalType[]
}

export interface RemoveGoalType {
  type: 'REMOVE_GOAL'
  payload: GoalType
}

export interface GoalsErrorType {
  type: 'GOALS_ERROR'
  payload: ClientErrorType
}

export interface AddGoalFailedType {
  type: 'ADD_GOAL_FAILED'
}

export interface RemoveGoalFailedType {
  type: 'REMOVE_GOAL_FAILED'
}

export interface GetUserAffirmationsType {
  type: 'GET_USER_AFFIRMATIONS'
  payload: UserAffirmationType[]
}

export interface GetAffirmationsErrorType {
  type: 'GET_AFFIRMATIONS_ERROR'
}

export interface AddImageType {
  type: 'ADD_IMAGE'
  payload: ImageType
}

export interface GetImagesType {
  type: 'GET_IMAGES'
  payload: ImageType[]
}

export interface GetHistoryImagesType {
  type: 'GET_HISTORY_IMAGES'
  payload: ImageType[]
}

export interface UpdateImageType {
  type: 'UPDATE_IMAGE'
  payload: ImageType
}

export interface RemoveImageType {
  type: 'REMOVE_IMAGE'
  payload: number
}

export interface AddImageFailedType {
  type: 'ADD_IMAGE_FAILED'
}

export interface ImagesFailedType {
  type: 'IMAGES_FAILED'
  payload: ClientErrorType
}

export type AppActionTypes =
  | AddGoalType
  | GetGoalsType
  | RemoveGoalType
  | GoalsErrorType
  | AddGoalFailedType
  | RemoveGoalFailedType
  | GetUserAffirmationsType
  | GetAffirmationsErrorType
  | AddImageType
  | GetImagesType
  | GetHistoryImagesType
  | UpdateImageType
  | RemoveImageType
  | AddImageFailedType
  | ImagesFailedType
