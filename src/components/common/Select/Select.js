import React from 'react';

import '../Input/Input.scss';

function Select({ data, className, parentClassName, onChange, items, t }) {
  return (
    <div>
      <div className={parentClassName}>
        <select {...{ value: data.value, onChange, className }}>
          <option>{t('select-country')}</option>
          {items.map(item => (
            <option value={item.code} key={item.code}>{item.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        {data.error && data.changed && <div className="input-error">{data.error}</div>}
      </div>
    </div>
    
  )
}


export default Select;
