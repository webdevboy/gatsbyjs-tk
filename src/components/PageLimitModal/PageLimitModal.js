import React from 'react';
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { useNavigate } from '@reach/router';

import { isBrowser } from 'src/utils/auth';
import getLangLink from 'src/utils/getLangLink';

import './PageLimitModal.scss';

function PageLimitModal() {
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();
  const goToLogin = () => {
    if(isBrowser) {
      navigate(getLangLink('/login', i18n.language));
    }
  }
  return (
    <div className="page-limit-modal">
      <div className="page-limit-modal__body">
        <div className="page-limit-modal__body__title">
          Please log in in if you want to continue browsing.
        </div>
        <button onClick={goToLogin} className="page-limit-modal__body__login-btn">
          Log In
        </button>
      </div>
    </div>
  )
}

export default PageLimitModal;
