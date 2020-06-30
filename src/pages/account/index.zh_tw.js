import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { isAuthenticated, isBrowser } from '../../utils/auth';

import Layout from '../../components/Layout';
import AccountComponent from '../../components/Account/Account';
import AccountResetPassword from '../../components/AccountResetPassword/AccountResetPassword';
import '../../styles/pages/account.scss';

function Account() {
  const [t] = useTranslation(['account', 'auth']);
  const navigate = useNavigate();
  const [isAccountView, setAccountView] = useState(true);

  useEffect(() => {
    if (!isAuthenticated() && isBrowser) {
      navigate('/login');
    }
  }, []);

  if (!isAuthenticated()) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <Layout>
      <div
        className={cx('account-wrapper', { 'account--active': isAccountView })}
      >
        <h2 className="account__title">{t('auth:my-account')}</h2>
        <div className="account__toggles">
          <div
            className={cx('account__toggle', {
              'account__toggle--active': isAccountView,
            })}
            onClick={() => {
              setAccountView(true);
            }}
          >
            {t('account-overview')}
          </div>
          <div
            className={cx('account__toggle', {
              'account__toggle--active': !isAccountView,
            })}
            onClick={() => {
              setAccountView(false);
            }}
          >
            {t('rest-password')}
          </div>
        </div>
        <AccountComponent />
        <AccountResetPassword />
      </div>
    </Layout>
  );
}

export default Account;
