import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { navigate } from 'gatsby';

import 'src/styles/pages/developing.scss';
import { getDevPasswordAccepted } from 'src/utils/getDevPasswordAccepted';

const Callback = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitClick = () => {
    if(password === 'tasting123!') {
      Cookies.set('devPasswordAccepted', password);
      navigate('/');
    }
    else {
      setError('Incorrect password');
    }
  }

  useEffect(() => {
    if(getDevPasswordAccepted()) {
      navigate('/');
    };
  }, [])
  
  return (
    <div className="developing">
      <h1>Please enter password to get access</h1>
      {error && <div>{error}</div>}
      <input type="text" onChange={e => {setPassword(e.target.value)}} value={password} placeholder="Password..." />
      <button type="button" onClick={submitClick}>
        Submit
      </button>
    </div>
  )
}

export default Callback
