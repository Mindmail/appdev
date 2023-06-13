import FacebookIcon from '@/assets/icons/facebookIcon.png'
import InstagramIcon from '@/assets/icons/instagramIcon.png'
import TwitterIcon from '@/assets/icons/twitterIcon.png'

export const SocialMedia = () => (
  <div>
    <a
      href="https://facebook.com"
      target="_blank"
      className="social-link"
      rel="noreferrer"
    >
      <img alt="" src={FacebookIcon} className="px-2" />
    </a>
    <a
      href="https://facebook.com"
      target="_blank"
      className="social-link"
      rel="noreferrer"
    >
      <img alt="" src={TwitterIcon} className="px-2" />
    </a>
    <a
      href="https://facebook.com"
      target="_blank"
      className="social-link"
      rel="noreferrer"
    >
      <img alt="" src={InstagramIcon} className="px-2" />
    </a>
  </div>
)
