import React from "react"
import { Link } from "gatsby"
import { logout, isAuthenticated, getProfile } from "../../utils/auth"
import { useTranslation } from "react-i18next"

import convertLinkLocale from '../../utils/convertLinkLocale';
import AccountIcon from 'src/images/account-icon.svg';
import './LoginLogout.scss';

const user = getProfile()

const LoginLogout = () => {
  const { t, i18n } = useTranslation('common');
  if (isAuthenticated()) {
    return (
      <div className="header__user">
        <Link to={convertLinkLocale('/account', i18n.language)}>
          <img src={AccountIcon} alt="Account" />
        </Link>
        <a
          href="#logout"
          onClick={e => {
            e.preventDefault()
            logout()
          }}
        >
          {t('logout')}{" "}
        </a>
      </div>
    )
  } else {
    return (
      <>
        <Link to={convertLinkLocale('/login', i18n.language)} className="header__login-link">
          {t('login')}{" "}
        </Link>
      </>
    )
  }
}

export default LoginLogout
