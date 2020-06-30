import React from 'react';

import './AuthInput.scss';

const AuthInput = (props) => (
  <div className="auth-input">
    <input type="text" {...props} />
  </div>
);

export default AuthInput;

