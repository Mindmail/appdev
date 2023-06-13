import axios from 'axios'

export const apiClientWithToken = (token: any) => {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  })
  return apiClient
}
