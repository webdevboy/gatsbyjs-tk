import React from 'react';

import './Input.scss';

function Input({ data, type, placeholder, className, parentClassName, minLength, title, onChange }) {
  return (
    <div className={parentClassName}>
      <input value={data.value} {...{ value: data.value, type, placeholder, onChange, className, minLength, title }} />
      {data.error && data.changed && <div className="input-error">{data.error}</div>}
    </div>
  )
}


export default Input;
