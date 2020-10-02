import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useNavigate } from '@reach/router';
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";

import { isAuthenticated, isBrowser } from 'src/utils/auth';
import SEO from "src/components/seo";
import Layout from '../../components/Layout';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import LoginComponent from '../../components/Login/Login';
import SignupComponent from '../../components/Signup/Signup';
import '../../styles/pages/login.scss';

function Login() {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
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
