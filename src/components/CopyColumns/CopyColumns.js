import React from 'react';
import { MEDIUM_BREAKPOINT, XLARGE_BREAKPOINT } from 'src/utils/breakpoints';
import { isBrowser } from 'src/utils/auth';

import './CopyColumns.scss';

export default function CopyColumns({ columns, theme }) {
  return (
    <section className={`copy-columns columns-${columns ? columns.length : 0} ${theme}`}>
      {columns && columns.map((col, i) => (
        <div
          key={i}
          className="group"
        >
          {col.icon && (
            <span className="icon-container">
              <img
                className="icon"
                src={col.icon.sourceUrl}
                alt={col.altText || 'Icon'}
              />
            </span>
          )}
          {col.headline && <h4 className="headline">{col.headline}</h4>}
          {col.subheader && <p className="subhead">{col.subheader}</p>}
          <div
            className="copy"
            dangerouslySetInnerHTML={{ __html: col.columnCopy && col.columnCopy.replace && col.columnCopy.replace('<tab>', '<tab />') }} 
          />
        </div>
      ))}
    </section>
  );
}
