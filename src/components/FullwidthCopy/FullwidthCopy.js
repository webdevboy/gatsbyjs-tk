import React from 'react';
import * as cx from "classnames";

import './FullwidthCopy.scss';

function FullwidthCopy({
  copy,
  copyBackgroundColor,
  copyColor,
}) {
  return (
    <section
      className={cx({
        'fullwidth-copy': true
      })}
      style={{ backgroundColor: copyBackgroundColor }}
    >
      <div className="container">
        <div className="wrapper">
          <div
            style={{ color: copyColor }}
            dangerouslySetInnerHTML={{ __html: copy }}
          ></div>
        </div>
      </div>
    </section>
  );
}

export default FullwidthCopy;
