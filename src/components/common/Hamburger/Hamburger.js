import React from 'react';
import cx from 'classnames';

import './Hamburger.scss';

function Hamburger({ isOpen, theme }) {
  return (
    <div className={`hamburger ${theme}`}>
      <div className={cx('nav-icon', { open: isOpen })}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Hamburger;
