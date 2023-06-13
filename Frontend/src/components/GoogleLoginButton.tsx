import GoogleLogin from '@leecheuk/react-google-login'
import { RiGoogleFill } from 'react-icons/ri'

export const GoogleLoginButton = ({
  handleSuccess,
  handleFailure,
}: {
  handleSuccess: AnyFunction
  handleFailure: AnyFunction
}) => {
  return (
    <GoogleLogin
      clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID as string}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="btn button-label btn-block mindmail-button button-primary google-button w-100"
        >
          <div className="d-flex justify-content-center align-items-center">
            <RiGoogleFill size={19} />
            <span className="ml-2">Google</span>
          </div>
        </button>
      )}
      buttonText="Login"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
  )
}
