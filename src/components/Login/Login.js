import React, { useState } from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import './Login.scss';
import { login, loginWithFacebook } from '../../utils/auth';
import Input from 'src/components/common/Input/Input';
import Checkbox from 'src/components/common/Checkbox/Checkbox';
import getLangLink from '../../utils/getLangLink';

function Login({ setError }) {

  const [remember, setRemember] = useState(true);
  const [username, setUsername] = useState({ value: '', isValid: false, error: 'Please enter a valid Email Address', changed: false });
  const [password, setPassword] = useState({ value: '', isValid: false, error: 'Incorrect Password', changed: false });
  const [t, i18n] = useTranslation('auth');

  const changeUsername = e => {
    const { value } = e.target;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValid = pattern.test(value);
    setUsername({
      value,
      isValid,
      error: isValid ? '' : 'Please enter a valid Email Address',
      changed: true,
    });
  }

  const changePassword = e => {
    const { value } = e.target;
    const pattern = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    const patternSymbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    const isValid = pattern.test(value) && patternSymbols.test(value) && value.length > 8;
    setPassword({
      value,
      isValid,
      error: isValid ? '' : 'Invalid Password. The password should be at least eight characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ & ).',
      changed: true,
    });
  };

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
          <button type="button" className="login__facebook" onClick={() => {loginWithFacebook(setError)}}>
            {t('login-facebook')}
          </button>
        </form>
      </div>
    </>
  )
}

export default Login;
