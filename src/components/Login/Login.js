import React, { useState } from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import './Login.scss';
import { login, loginWithFacebook } from '../../utils/auth';
import getLangLink from '../../utils/getLangLink';

function Login({ setError }) {

  const [remember, setRemember] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [t, i18n] = useTranslation('auth');

  return (
    <>
      <div className="login-container">
        <form onSubmit={e => { e.preventDefault(); login(username, password, setError);}}>
          <div className="login__input">
            <input type="email" placeholder={t('email-address')} value={username} onChange={e => {setUsername(e.target.value)}} />
          </div>
          <div className="login__input">
              <input type="password" placeholder={t('password')} value={password} onChange={e => {setPassword(e.target.value)}} />
          </div>
          <button type="button" className="login__submit" onClick={() => {login(username, password, setError)}}>
            {t('log-in')}
          </button>
          <Link to={getLangLink('/lost-password', i18n.language)} className="login__lost-password">
            {t('lost-password')}
          </Link>
          <div className="login__remember">
            <input checked={remember} onChange={e => {setRemember(e.target.checked)}} id="login__remember__checkbox" type="checkbox" />
            <label htmlFor="login__remember__checkbox">{t('remember-me')}</label>
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
