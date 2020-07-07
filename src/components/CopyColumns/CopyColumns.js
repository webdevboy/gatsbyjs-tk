import React, { useState, useRef } from 'react';
import * as ScrollMagic from 'scrollmagic';
import { MEDIUM_BREAKPOINT, XLARGE_BREAKPOINT } from 'src/utils/breakpoints';
import { isBrowser } from 'src/utils/auth';

import './CopyColumns.scss';

export default function CopyColumns({ columns, theme }) {
  const [scrollMagic, setScrollMagic] = useState({
    controller: isBrowser
      ? new ScrollMagic.Controller({
          globalSceneOptions: { triggerHook: 'onEnter', duration: '300%' },
        })
      : null,
  });

  const sectionToAnimateRef = useRef(null);

  const cols = 6;

  const isBrowser = typeof window !== "undefined"

  const getColSpan = () => {
    if (!isBrowser) return;

    if (
      window.innerWidth >= MEDIUM_BREAKPOINT &&
      window.innerWidth < XLARGE_BREAKPOINT
    ) {
      return `auto / span ${cols / columns.length}`;
    }

    if (window.innerWidth >= XLARGE_BREAKPOINT) {
      return `auto / span 2`;
    }
  };

  // const { controller } = scrollMagic;
  // useEffect(() => {
  //   new ScrollMagic.Scene({
  //     triggerElement: sectionToAnimateRef.current,
  //   })
  //     .setTween(sectionToAnimateRef.current, { y: '-150%' })
  //     .addTo(controller);
  // }, [])

  console.log(columns);

  return (
    <section className={`copy-columns ${theme}`}>
      {columns.map((col, i) => (
        <div
          key={i}
          className="group"
          style={{
            gridColumn: getColSpan(),
            gridColumnStart:
              i === 0 &&
              columns.length === 2 &&
              isBrowser &&
              window.innerWidth >= XLARGE_BREAKPOINT
                ? '2'
                : false,
          }}
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
          <p
            className="copy"
            dangerouslySetInnerHTML={{ __html: col.columnCopy }}
          ></p>
        </div>
      ))}
    </section>
  );
}
