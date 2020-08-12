import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { getProfile, logout, updateUserData, isAuthenticated } from '../../utils/auth';
import Checkbox from 'src/components/common/Checkbox/Checkbox';
import countries from '../Signup/countries.json';
import './Account.scss';

function Account() { 
  const [t, i18n] = useTranslation(['account', 'auth']);
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [receiveEmails, setReceiveEmails] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [userUpdating, setUserUpdating] = useState(false);
  const user = getProfile();

  useEffect(() => {
    if(!user || !user.user_metadata) return;
    setEmail(user.email || user.user_metadata.email);
    setFirstname(user.user_metadata.firstname);
    setLastname(user.user_metadata.lastname);
    setCountry(user.user_metadata.country);
    setCity(user.user_metadata.city);

    // if the property should be false, then it is set as an empty string
    // because of auth0 doesn't allow to provide bool properties in signup user_metadata

    setReceiveEmails(!!user.user_metadata.receiveEmails);
    setReceiveUpdates(!!user.user_metadata.receiveUpdates);
  }, [])

  const handleUserUpdate = () => {
    const userMetadata = {
      firstname,
      lastname,
      country,
      city,
      receiveEmails: receiveEmails ? receiveEmails.toString() : '',
      receiveUpdates: receiveUpdates ? receiveUpdates.toString() : '',
    };
    updateUserData(userMetadata, () => {setUserUpdating(false)});
    setUserUpdating(true);
  }
  return (
    <div className="account-container">
      <div className="account__description">
        {user && user.user_metadata && (
          <div>{t('hello')} {user.user_metadata.firstname} ({t('not')} {user.user_metadata.firstname}? <a href="#" onClick={e => {e.preventDefault(); logout();}}>{t('sign-out')}</a>)</div>
        )}
        <p>
          {t('account_desc1')}
        </p>
        <p>
          {t('account_desc2')}
        </p>
      </div>
      <div className="account__info">
        <div className="account__input">
          <input type="text" placeholder={t('auth:email-address')} value={email} onChange={e => {setEmail(e.target.value)}} readOnly={user.email || (user.user_metadata && user.user_metadata.email)} />
        </div>
        <div className="account__input">
          <input type="text" placeholder={(t('auth:first-name'))} value={firstname} onChange={e => {setFirstname(e.target.value)}} />
        </div>
        <div className="account__input">
          <input type="text" placeholder={(t('auth:last-name'))} value={lastname} onChange={e => {setLastname(e.target.value)}} />
        </div>
        <div className="account__input">
          <div className="account__input__select">
            <select value={country} onChange={e => {setCountry(e.target.value)}}>
              <option>{t('auth:select-country')}</option>
              {countries.map(country => (
                <option value={country.code} key={country.code}>{country.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="account__input">
          <input type="text" placeholder={t('auth:city')} value={city} onChange={e => {setCity(e.target.value)}} />
        </div>
        <div className="signup__checkbox-container">
          <Checkbox checked={receiveUpdates} onClick={() => {setReceiveUpdates(!receiveUpdates)}} />
          <label onClick={() => {setReceiveUpdates(!receiveUpdates)}}>{t('auth:updates-description')}</label>
        </div>
        <div className="signup__checkbox-container">
          <Checkbox checked={receiveEmails} onClick={() => {setReceiveEmails(!receiveEmails)}} />
          <label onClick={() => {setReceiveEmails(!receiveEmails)}}>{t('auth:email-description')}</label>
        </div>
        <div className="privacy-notice-text">
          {t('auth:privacy-policy-description')}
          <a href="#">{t('auth:privacy-policy')}</a>.
        </div>
        <button type="button" className={cx('account__update__button', { disabled: userUpdating })} onClick={handleUserUpdate}>
          {t('update')}
        </button>
      </div>
    </div>
  );
}


export default Account;
