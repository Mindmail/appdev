import { useNavigate } from 'react-router-dom'

import { apiClientWithToken } from '@/store/apiClient'

export const useFacebookLogin = ({ callback }: { callback: AnyFunction }) => {
  const navigate = useNavigate()
  const responseFacebook = async (response: any) => {
    await apiClientWithToken(localStorage.getItem('mindmailtoken'))
      .post('/signup/facebook', {
        email: response.email,
        name: response.name,
      })
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

  return { responseFacebook }
}
