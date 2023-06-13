import jwt from 'jsonwebtoken'

const Authentication = (): boolean => {
  // TODO: Update checking authentication route
  return true
  const authHeader = localStorage.getItem('mindmailtoken')
  const bearer = 'Bearer '
  if (!authHeader) {
    return false
  }
  const token = authHeader?.replace(bearer, '') || ''
  try {
    // const decoded =
    jwt.verify(token, import.meta.env.VITE_APP_JWT_SECRET as string) || ''
    return true
  } catch (e) {
    return false
  }
}

export default Authentication
