import React from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import './LoginHeader.scss';

function LoginHeader({ isLogin, setIsLogin, error }) {
  const [t, i18n] = useTranslation(['common', 'auth']);
  return (
    <div className="login-header">
      <h2>{t('auth:my-account')}</h2>
      {error && (
        <div className="login__error" id="login__error">
          {error}
        </div>
      )}
      <div className="login-header__toggle">
        <div className={cx({ 'login-header__toggle--active': isLogin })} onClick={() => {setIsLogin(true)}}>{t('login')}</div>
        <div className={cx({ 'login-header__toggle--active': !isLogin })} onClick={() => {setIsLogin(false)}}>{t('auth:register')}</div>
      </div>
    </div>
  )
}

export default LoginHeader;

