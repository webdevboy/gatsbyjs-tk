import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { logout, resetPassword, getProfile } from '../../utils/auth';
import './AccountResetPassword.scss';

function ResetPassword() {
  const [t, i18n] = useTranslation(['account', 'auth']);
  const [email, setEmail] = useState('');
  const [emailTextTitle, setEmailSentText] = useState('');
  const user = getProfile();

  return (
    <div className="reset-password">
      <div className="reset-password__description">
        {user && user.user_metadata && (
          <div>{t('hello')} {user.user_metadata.firstname} ({t('not')} {user.user_metadata.firstname}? <a href="#" onClick={e => {e.preventDefault(); logout();}}>{t('sign-out')}</a>)</div>
        )}
        {/* <p>
          {t('account_desc1')}
        </p> */}
        <p>
          {t('account_desc2')}
        </p>
      </div>
      <div className="reset-password__info">
        <div className="account__input">
          <input type="text" placeholder={t('auth:email-address')} value={email} onChange={e => {setEmail(e.target.value)}} />
        </div>
        <button type="button" className="reset-password__update__button" onClick={() => {resetPassword(email, setEmailSentText)}}>
          {t('auth:send-reset-code')}
        </button>
        {emailTextTitle && (
          <div className="reset-password__email-notice">
            {t('auth:lost-password-success-text')}
          </div>
        )}     
      </div>
    </div>
  )
}

export default ResetPassword;
