import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useNavigate } from '@reach/router';
import { useTranslation } from "react-i18next";
import { useLocation } from '@reach/router';
import setLanguage from 'src/utils/setLanguage';
import useComponentWillMount from 'src/hooks/useComponentWillMount';

import { isAuthenticated, isBrowser } from 'src/utils/auth';
import SEO from "src/components/seo";
import Layout from 'src/components/Layout';
import LoginHeader from 'src/components/LoginHeader/LoginHeader';
import LoginComponent from 'src/components/Login/Login';
import SignupComponent from 'src/components/Signup/Signup';
import 'src/styles/pages/login.scss';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [t, i18n] = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  useComponentWillMount(() => {setLanguage(location.pathname, i18n)});
  useEffect(() => {
    if (isAuthenticated() && isBrowser) {
      navigate('/');
    }
  }, []);

  if (isAuthenticated()) {
    return null;
  }
  return (
    <Layout removeTopPadding>
      <SEO title={`Tasting Kitchen ${t('nav-login')}`} />
      <LoginHeader {...{ isLogin, setIsLogin, error }} />
      <div
        className={cx('login-signup-container', { 'login--active': isLogin })}
      >
        <LoginComponent {...{ setError }} />
        <SignupComponent {...{ setError }} />
      </div>
    </Layout>
  );
}

export default Login;
