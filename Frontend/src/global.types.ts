/* eslint-disable prettier/prettier */
export interface GoalType {
  id?: number
  goalId: number
  type: string
  caption?: string
  default_caption: string
  question: string
  answer: string
  selected: boolean
}

export interface UserAffirmationType {
  id?: number
  goalId: number
  defaultId: number
  quiz_type: string
  question: string
  options?: string
  quiz_no: number
  answer?: string
}

export interface ImageType {
  id: number
  photoURL: string
  description: string
  state: string
  isGratitude: boolean
  isVisualization: boolean
  datetime?: string
}

export interface UserInfoType {
  id: number
  name: string
  email: string
  buddyname: string
  buddyurl: string
  notifytime?: number
  notifyweekday?: string[]
}

export interface ClientErrorType {
  status?: string
  statusText?: string
}

export interface ChatType {
  side: string
  message: string
}
