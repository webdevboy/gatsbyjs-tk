import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import countries from './countries.json';

import { signup } from '../../utils/auth';
import './Signup.scss';

function Signup({ setError }) {
  const [t, i18n] = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [receiveEmails, setReceiveEmails] = useState(true);
  const [receiveUpdates, setReceiveUpdates] = useState(true);

  const handleSignup = () => {
    signup(email, password, firstname, lastname, country, city, receiveUpdates, receiveEmails, setError);
  }
  return (
    <div className="signup-container">
      <form onSubmit={e => {e.preventDefault(); handleSignup();}}>
          <div className="login__input">
              <input type="email" placeholder={t('email-address')} value={email} onChange={e => {setEmail(e.target.value)}} />
          </div>
          <div className="login__input">
              <input
                type="password"
                placeholder={t('password')}
                minLength="8"
                title={t('pass-length-title')}
                value={password}
                onChange={e => {setPassword(e.target.value)}}
              />
          </div>
          <div className="login__input">
              <input type="text" placeholder={t('first-name')}  value={firstname} onChange={e => {setFirstname(e.target.value)}} />
          </div>
          <div className="login__input">
              <input type="text" placeholder={t('last-name')}  value={lastname} onChange={e => {setLastname(e.target.value)}} />
          </div>
          <select value={country} onChange={e => {setCountry(e.target.value)}}>
            <option>{t('select-country')}</option>
            {countries.map(country => (
              <option value={country.code} key={country.code}>{country.name}</option>
            ))}
          </select>
          <div className="login__input">
            <input type="text" placeholder={t('city')} value={city} onChange={e => {setCity(e.target.value)}} />
          </div>
          <div className="signup__checkbox-container">
            <input id="signup__checkbox__updates" type="checkbox" checked={receiveUpdates} onChange={e => {setReceiveUpdates(e.target.checked)}} />
            <label htmlFor="signup__checkbox__updates">{t('updates-description')}</label>
          </div>
          <div className="signup__checkbox-container">
            <input id="signup__checkbox__emails" type="checkbox" checked={receiveEmails} onChange={e => {setReceiveEmails(e.target.checked)}} />
            <label htmlFor="signup__checkbox__emails">{t('email-description')}</label>
          </div>
          <div className="login__input">
            {t('privacy-policy-description')}
            <a href="#">{t('privacy-policy')}</a>.
          </div>
          <button type="button" className="login__submit" onClick={handleSignup}>
            {t('register')}
          </button>
      </form>
  </div>
  )
}


export default Signup;
