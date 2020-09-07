import React, { useState } from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import './Login.scss';
import { login, loginWithFacebook, loginWithWeibo } from '../../utils/auth';
import Input from 'src/components/common/Input/Input';
import Checkbox from 'src/components/common/Checkbox/Checkbox';
import getLangLink from '../../utils/getLangLink';

function Login({ setError }) {

  const [t, i18n] = useTranslation('auth');
  const [remember, setRemember] = useState(true);
  const [username, setUsername] = useState({ value: '', isValid: false, error: t('validation-email'), changed: false });
  const [password, setPassword] = useState({ value: '', isValid: false, error: t('validation-password-short'), changed: false });

  const changeUsername = e => {
    const { value } = e.target;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValid = pattern.test(value);
    setUsername({
      value,
      isValid,
      error: isValid ? '' : t('validation-email'),
      changed: true,
    });
  }

  const changePassword = e => {
    const { value } = e.target;
    const pattern = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    const patternSymbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    // const isValid = pattern.test(value) && patternSymbols.test(value) && value.length > 8;
    const isValid = value.length > 8;
    setPassword({
      value,
      isValid,
      error: isValid ? '' : t('validation-password-short'),
      changed: true,
    });
  };

  const facebookLogin = () => {
    loginWithFacebook(setError);
  }

  const weiboLogin = () => {
    loginWithWeibo(setError);
  }

  const submit = e => {
    let isFormValid = true;
    e.preventDefault();
    if(!username.isValid) {
      isFormValid = false;
      setUsername({ ...username, changed: true });
    }
    if(!password.isValid) {
      isFormValid = false;
      setPassword({ ...password, changed: true });
    }
    if(isFormValid) {
      login(username.value, password.value, setError);
    }
  }

  return (
    <>
      <div className="login-container">
        <form onSubmit={submit}>
          <Input
            type="email"
            parentClassName="login__input"
            placeholder={t('email-address')}
            data={username}
            onChange={changeUsername}
          />
          <Input
            type="password"
            parentClassName="login__input"
            placeholder={t('password')}
            data={password}
            onChange={changePassword}
          />
          <button type="submit" className="login__submit">
            {t('log-in')}
          </button>
          <Link to={getLangLink('/lost-password', i18n.language)} className="login__lost-password">
            {t('lost-password')}
          </Link>
          <div className="login__remember">
            <Checkbox checked={remember} onClick={() => {setRemember(!remember)}} />
            <label htmlFor="login__remember__checkbox" onClick={() => {setRemember(!remember)}}>{t('remember-me')}</label>
          </div>
          <button type="button" className="login__facebook" onClick={facebookLogin}>
            {t('login-facebook')}
          </button>
          {/* <button type="button" className="login__weibo" onClick={weiboLogin}>{t('login-weibo')}</button> */}
        </form>
      </div>
    </>
  )
}

export default Login;
