import { useNavigate } from 'react-router-dom'

import { apiClientWithToken } from '@/store/apiClient'

export const useGoogleLogin = (callback: AnyFunction) => {
  const navigate = useNavigate()
  const handleGoogleSuccess = async (data: any) => {
    await apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .post('/signup/google', { token: data.tokenId })
      .then((res: any) => {
        localStorage.setItem('mindmailtoken', res.data.token)
        navigate('/setup/plan')
      })
      .catch((err: any) => {
        if (err.response === undefined) {
          callback('something went wrong')
        } else {
          callback(err.response.data)
        }
      })
  }

  const handleGoogleFailure = (err: any) => {
    callback(err)
  }

  return { handleGoogleFailure, handleGoogleSuccess }
}
