import React from 'react';
import cx from 'classnames';

import './AuthInput.scss';

const AuthInput = (props) => (
  <div className={cx('auth-input', { 'auth-input--reset-password': props.resetPassword })}>
    <input type="text" {...props} />
  </div>
);

export default AuthInput;

