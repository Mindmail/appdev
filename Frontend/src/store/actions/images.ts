import type { Dispatch } from 'redux'

import { apiClientWithToken } from '@/store/apiClient'

import type {
  GetImagesType,
  GetHistoryImagesType,
  UpdateImageType,
  RemoveImageType,
  ImagesFailedType,
  AddImageFailedType,
} from './action.types'
// import { AddImageType } from './action.types'

export const getUserImages = (
  dispatch: Dispatch<GetImagesType | ImagesFailedType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .get('/visualization/images')
    .then((res) => {
      dispatch({
        payload: res.data.items,
        type: 'GET_IMAGES',
      })
    })
    .catch((err) => {
      dispatch({
        payload: err.response,
        type: 'IMAGES_FAILED',
      })
    })
}

export const updateUserImage = (
  item: any,
  dispatch: Dispatch<UpdateImageType | AddImageFailedType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .put('/visualization/image/' + item.id, item)
    .then(() => {
      dispatch({
        payload: item,
        type: 'UPDATE_IMAGE',
      })
    })
    .catch(() => {
      dispatch({
        type: 'ADD_IMAGE_FAILED',
      })
    })
}

export const deleteUserImage = (
  item: any,
  dispatch: Dispatch<RemoveImageType | AddImageFailedType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .delete('/visualization/image/' + item.id)
    .then(() => {
      dispatch({
        payload: item.id,
        type: 'REMOVE_IMAGE',
      })
    })
    .catch(() => {
      dispatch({
        type: 'ADD_IMAGE_FAILED',
      })
    })
}

export const getGratitudeImages = (
  dispatch: Dispatch<GetImagesType | ImagesFailedType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .get('/visualization/gratitudeimages?isHistory=0')
    .then((res) => {
      dispatch({
        payload: res.data.data,
        type: 'GET_IMAGES',
      })
    })
    .catch((err) => {
      dispatch({
        payload: err.response,
        type: 'IMAGES_FAILED',
      })
    })
}

export const getGratitudeHistoryImages = (
  dispatch: Dispatch<GetHistoryImagesType | ImagesFailedType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .get('/visualization/gratitudeimages?isHistory=1')
    .then((res) => {
      dispatch({
        payload: res.data.data,
        type: 'GET_HISTORY_IMAGES',
      })
    })
    .catch((err) => {
      dispatch({
        payload: err.response,
        type: 'IMAGES_FAILED',
      })
    })
}

export const getVisualizationImages = (
  dispatch: Dispatch<GetImagesType | ImagesFailedType>
) => {
  apiClientWithToken(localStorage.getItem('mindmailtoken'))
    .get('/visualization/visualizationimages')
    .then((res) => {
      dispatch({
        payload: res.data.data,
        type: 'GET_IMAGES',
      })
    })
    .catch((err) => {
      dispatch({
        payload: err.response,
        type: 'IMAGES_FAILED',
      })
    })
}
