import React from 'react'
import { Navigate } from 'react-router-dom'

// import Authentication from './auth.service'

type T = { element: React.ReactNode }
const PrivateRoute: React.FC<T> = ({ element }: T) => {
  // const auth = Authentication()
  const auth = true
  return auth ? <>{element}</> : <Navigate to="/setup" />
}

export default PrivateRoute
