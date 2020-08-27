import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import countries from './countries.json';

import { signup } from '../../utils/auth';
import Input from 'src/components/common/Input/Input';
import Select from 'src/components/common/Select/Select';
import Checkbox from 'src/components/common/Checkbox/Checkbox';
import './Signup.scss';

function Signup({ setError }) {
  const [t, i18n] = useTranslation('auth');
  const [email, setEmail] = useState({ value: '', isValid: false, error: t('validation-email'), changed: false });
  const [password, setPassword] = useState({ value: '', isValid: false, error: t('validation-password-long'), changed: false });
  const [passwordConfirm, setPasswordConfirm] = useState({ value: '', isValid: false, error: t('validation-password-short'), changed: false });
  const [firstname, setFirstname] = useState({ value: '', isValid: false, error:  t('Please enter your First name'), changed: false });
  const [lastname, setLastname] = useState({ value: '', isValid: false, error: t('Please enter your Last name'), changed: false });
  const [country, setCountry] = useState({ value: '', isValid: false, error: t('Please choose a country'), changed: false });
  const [city, setCity] = useState({ value: '', isValid: false, error: t('Please enter a City'), changed: false });
  const [receiveEmails, setReceiveEmails] = useState(true);
  const [receiveUpdates, setReceiveUpdates] = useState(true);

  const changeEmail = e => {
    const { value } = e.target;
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValid = pattern.test(value);
    setEmail({
      value,
      isValid,
      error: isValid ? '' : t('validation-email'),
      changed: true,
    });
  };

  const changePassword = e => {
    const { value } = e.target;
    const pattern = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    const patternSymbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    const isValid = pattern.test(value) && patternSymbols.test(value) && value.length > 8;
    setPassword({
      value,
      isValid,
      error: isValid ? '' : t('validation-password-long'),
      changed: true,
    });
  };

  const changePasswordConfirm = e => {
    const { value } = e.target;
    const isValid = value === password.value && value.length > 8;
    console.log(value, password);
    setPasswordConfirm({
      value,
      isValid,
      error: isValid ? '' : t('validation-password-short'),
      changed: true,
    });
  };

  const changeFirstname = e => {
    const { value } = e.target;
    const isValid = value !== '';
    setFirstname({
      value,
      isValid,
      error: isValid ? '' : t('Please enter your First name'),
      changed: true,
    });
  };

  const changeLastname = e => {
    const { value } = e.target;
    const isValid = value !== '';
    setLastname({
      value,
      isValid,
      error: isValid ? '' : t('Please enter your Last name'),
      changed: true,
    });
  }

  const changeCountry = e => {
    const { value } = e.target;
    const isValid = value !== '';
    setCountry({
      value,
      isValid,
      error: isValid ? '' : t('Please choose a country'),
      changed: true,
    })
  }

  const changeCity = e => {
    const { value } = e.target;
    const isValid = value !== '';
    setCity({
      value,
      isValid,
      error: isValid ? '' : t('Please enter a City'),
      changed: true,
    });
  }

  const handleSignup = e => {
    let isFormValid = true;
    e.preventDefault();
    if(!email.isValid) {
      isFormValid = false;
      setEmail({ ...email, changed: true });
    }
    if(!password.isValid) {
      isFormValid = false;
      setPassword({ ...password, changed: true });
    }
    if(!passwordConfirm.isValid) {
      isFormValid = false;
      setPasswordConfirm({ ...passwordConfirm, changed: true });
    }
    if(!firstname.isValid) {
      isFormValid = false;
      setFirstname({ ...firstname, changed: true });
    }
    if(!lastname.isValid) {
      isFormValid = false;
      setLastname({ ...lastname, changed: true });
    }
    if(!country.isValid) {
      isFormValid = false;
      setCountry({ ...country, changed: true });
    }
    if(!city.isValid) {
      isFormValid = false;
      setCity({ ...city, changed: true });
    }
    if(isFormValid) {
      signup(email.value, password.value, firstname.value, lastname.value, country.value, city.value, receiveUpdates, receiveEmails, setError);
    }
  }
  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <Input
          type="email"
          parentClassName="login__input"
          placeholder={t('email-address')}
          data={email}
          onChange={changeEmail}
        />
        <Input
          type="password"
          parentClassName="login__input"
          placeholder={t('password')}
          minLength="8"
          title={t('pass-length-title')}
          data={password}
          onChange={changePassword}
        />
        <Input
          type="password"
          parentClassName="login__input"
          placeholder={t('password-confirm')}
          minLength="8"
          title={t('pass-length-title')}
          data={passwordConfirm}
          onChange={changePasswordConfirm}
        />
        <Input
          type="text"
          parentClassName="login__input"
          placeholder={t('first-name')}
          data={firstname}
          onChange={changeFirstname}
        />
        <Input
          type="text"
          parentClassName="login__input"
          placeholder={t('last-name')}
          data={lastname}
          onChange={changeLastname}
        />
        <Select
          parentClassName="login__input-select"
          t={t}
          items={countries}
          onChange={changeCountry}
          data={country}
        />
        <Input
          type="text"
          parentClassName="login__input"
          placeholder={t('city')}
          data={city}
          onChange={changeCity}
        />
        <div className="signup__checkbox-container">
          <Checkbox checked={receiveUpdates} onClick={() => {setReceiveUpdates(!receiveUpdates)}} />
          <label htmlFor="signup__checkbox__updates" onClick={() => {setReceiveUpdates(!receiveUpdates)}}>{t('updates-description')}</label>
        </div>
        <div className="signup__checkbox-container">
          <Checkbox checked={receiveEmails} onClick={() => {setReceiveEmails(!receiveEmails)}} />
          <label onClick={() => {setReceiveEmails(!receiveEmails)}} htmlFor="signup__checkbox__emails">{t('email-description')}</label>
        </div>
        <div className="privacy-notice-text">
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
