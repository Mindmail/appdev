/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClientErrorType, ImageType } from '../../global.types'
import type { AppActionTypes } from '../actions/action.types'

const initialState: ImageState = {
  error: {},
  historyImages: [],
  images: [],
}

const imagesReducer = (
  state: ImageState = initialState,
  action: AppActionTypes
): ImageState => {
  let images
  switch (action.type) {
    case 'GET_IMAGES':
      return {
        ...state,
        images: action.payload,
      }
    case 'GET_HISTORY_IMAGES':
      return {
        ...state,
        historyImages: action.payload,
      }
    case 'ADD_IMAGE':
      images = state.images
      images.push(action.payload)

      return {
        ...state,
        images,
      }
    case 'UPDATE_IMAGE':
      images = state.images.map((item, _index) => {
        if (item.id == action.payload.id) {
          return {
            ...item,
            ...action.payload,
          }
        } else return item
      })
      return {
        ...state,
        images,
      }
    case 'REMOVE_IMAGE':
      images = state.images.filter((item) => item.id != action.payload)
      return {
        ...state,
        images,
      }
    case 'ADD_IMAGE_FAILED':
      return {
        ...state,
      }
    case 'IMAGES_FAILED':
      return {
        ...state,
        historyImages: [],
        images: [],
      }
    default:
      return state
  }
}

export interface ImageState {
  images: ImageType[]
  historyImages: ImageType[]
  error: ClientErrorType
}

export default imagesReducer
