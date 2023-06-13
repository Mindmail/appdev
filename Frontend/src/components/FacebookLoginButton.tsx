import FacebookLogin from '@greatsumini/react-facebook-login'
import { FaFacebook } from 'react-icons/fa'

import { withToast } from './withToast'

export const FacebookLoginButton = withToast(
  ({
    handleResponse,
    toast,
  }: {
    handleResponse: AnyFunction
    toast: AnyFunction
  }) => {
    return (
      <FacebookLogin
        appId={import.meta.env.VITE_APP_FACEBOOK_API_KEY as string}
        onSuccess={(response) => {
          // console.log('Login Success!', response);
          handleResponse(response)
        }}
        onFail={() => {
          // console.log('Login Failed!', error)
          toast('Login Failed')
        }}
        onProfileSuccess={() => {
          // console.log('Get Profile Success!', response)
          toast('Get Profile Success!')
        }}
        render={({ onClick }) => (
          // <CustomComponent onClick={onClick} onLogoutClick={logout} />
          <button
            className="btn button-label btn-block mindmail-button button-primary w-100"
            onClick={onClick}
          >
            <div className="d-flex justify-content-center align-items-center">
              <FaFacebook size={19} />
              <span className="ml-2">Facebook</span>
            </div>
          </button>
        )}
      />
    )
  }
)
