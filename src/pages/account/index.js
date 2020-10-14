import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { useLocation } from '@reach/router';
import cx from 'classnames';
import { Helmet } from 'react-helmet';
import { isAuthenticated, isBrowser } from 'src/utils/auth';
import setLanguage from 'src/utils/setLanguage';
import useComponentWillMount from 'src/hooks/useComponentWillMount';

import Layout from 'src/components/Layout';
import AccountComponent from 'src/components/Account/Account';
import AccountResetPassword from 'src/components/AccountResetPassword/AccountResetPassword';
import 'src/styles/pages/account.scss';

function Account() {
  const [t, i18n] = useTranslation(['account', 'auth']);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAccountView, setAccountView] = useState(true);

  useComponentWillMount(() => {setLanguage(location.pathname, i18n)});
  useEffect(() => {
    if (!isAuthenticated() && isBrowser) {
      navigate('/login');
    }
  }, []);

  if (!isAuthenticated()) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <Layout removeTopPadding>
      <div
        className={cx('account-wrapper', { 'account--active': isAccountView })}
      >
        <Helmet>
          <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        </Helmet>
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
