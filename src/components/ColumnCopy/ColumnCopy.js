import React from 'react';
import cx from 'classnames';

import './ColumnCopy.scss';

function ColumnCopy({ columnCopyBody, theme }) {
  return (
    <div className={cx('column-copy-single', { dark: theme === 'dark' })}>
      <div className="column-copy-single" dangerouslySetInnerHTML={{ __html: columnCopyBody }} />
    </div>
  );
}

export default ColumnCopy;
