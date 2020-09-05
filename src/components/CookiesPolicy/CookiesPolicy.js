import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import './CookiesPolicy.scss';

function CookiesPolicy() {
  const [cookiesAccepted, setCookiesAcceptedState] = useState(false);
  const [t, i18n] = useTranslation();
  window._cookies = Cookies;
  const setCookiesAccepted = () => {
    Cookies.set('cookies-policy-accepted', true);
    setCookiesAcceptedState(true);
  };
  const closePopup = () => {
    setCookiesAcceptedState(true);
  }
  useEffect(() => {
    const cookiesPolicyAccepted = Cookies.get('cookies-policy-accepted');
    if(cookiesPolicyAccepted && cookiesPolicyAccepted === 'true') {
      setCookiesAcceptedState(true);
    }
    else {
      setCookiesAcceptedState(false);
    }
  }, []);
  if(cookiesAccepted) return null;
  return (
    <div className="cookies-policy">
      <div className="cookies-policy-body container">
        <div className="cookies-policy__text">{t('cookie-policy-popup')}</div>
        <div className="cookies-policy__buttons">
          <button className="cookies-policy__buttons__accept" onClick={setCookiesAccepted}>{t('cookie-policy-accept')}</button>
          <button className="cookies-policy__buttons__close" onClick={closePopup}>{t('cookie-policy-close')}</button>
        </div>
      </div>
    </div>
  )
}

export default CookiesPolicy;
