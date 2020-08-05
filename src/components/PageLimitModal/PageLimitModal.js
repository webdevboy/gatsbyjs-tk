import React from 'react';
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { useNavigate } from '@reach/router';

import { isBrowser } from 'src/utils/auth';
import getLangLink from 'src/utils/getLangLink';
import Logo from 'src/svgs/tk_logo';

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
    <div className="page-limit-modal-container">
      <div className="page-limit-modal">
        <div className="page-limit-modal__body">
          <div className="page-limit-modal__body__logo">
            <Logo style={{ width: '50px', height: '36px' }} />
          </div>
          <div className="page-limit-modal__body__description">
            {`${t('subscribe-popup-text1')} ${t('subscribe-popup-text2')} `}
            <a href="#">{`${t('subscribe-popup-text3')}`}</a>
            {` ${t('subscribe-popup-text4')}`}
          </div>
          <div className="page-limit-modal__body__buttons">
            <button
              type="button"
              className="page-limit-modal__body__buttons__button"
              onClick={goToLogin}
            >
              {t('login')}
            </button>
            <button
              type="button"
              className="page-limit-modal__body__buttons__button"
            >
              {t('subscribe-btn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLimitModal;
