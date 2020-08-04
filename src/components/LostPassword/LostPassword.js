import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './LostPassword.scss';
import { resetPassword } from 'src/utils/auth';
import { AuthInput } from 'src/components/common';

function LostPassword() {

  const [t, i18n] = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [emailSentText, setEmailSentText] = useState('');

  const submit = e => {
    e.preventDefault ();
    resetPassword(email, setEmailSentText);
  }
  return (
    <div className="lost-password container">
      <form onSubmit={submit}>
        <h2 className="lost-password__title">
          {t('lost-password-title')}
        </h2>
        {emailSentText && (
          <div className="lost-password__email-sent">
            {t('lost-password-success-text')}
          </div>
        )}
        <AuthInput placeholder={t('email-address')} value={email} onChange={e => {setEmail(e.target.value)}} resetPassword />
        <button type="submit" className="lost-password__submit">
          {t('send-reset-code')}
        </button>
      </form>
    </div>
  )
}

export default LostPassword;
