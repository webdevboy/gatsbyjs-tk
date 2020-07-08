import React from 'react';

import Checkmark from 'src/svgs/checkmark';
import './Checkbox.scss';

function Checkbox(props) {
  return (
    <div {...props} className="custom-checkbox">
      {props.checked && <Checkmark style={{ width: '15px', height: '12px' }} />}
    </div>
  )
}

export default Checkbox;
