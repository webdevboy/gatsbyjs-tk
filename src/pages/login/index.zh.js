import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useNavigate } from '@reach/router';
import { Helmet } from 'react-helmet';

import { isAuthenticated, isBrowser } from 'src/utils/auth';
import Layout from '../../components/Layout';
import LoginHeader from '../../components/LoginHeader/LoginHeader';
import LoginComponent from '../../components/Login/Login';
import SignupComponent from '../../components/Signup/Signup';
import '../../styles/pages/login.scss';

function Login() {
  const navigate = useNavigate();
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
    <Layout>
      <LoginHeader {...{ isLogin, setIsLogin, error }} />
      <Helmet>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </Helmet>
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
