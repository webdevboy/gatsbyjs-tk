import React, { useState, useEffect, useRef } from 'react';
import * as cx from "classnames";
import { Linear } from 'gsap';
import { isBrowser } from 'src/utils/auth';
import ScrollMagic from 'scrollmagic';

import './FiftyFifty.scss';

function FiftyFifty({
  copyBlock,
  headline,
  image,
  reverse,
  copyBackgroundColor,
  copyColor,
  theme,
}) {
  const imgRef = useRef(null);
  const [scrollMagic, setScrollMagic] = useState({
    controller: isBrowser ? new ScrollMagic.Controller() : null,
  });
  const { controller } = scrollMagic;
  useEffect(() => {
    if(!isBrowser) return;
    new ScrollMagic.Scene({
      duration: '200%',
      triggerElement: imgRef.current,
    })
      .setTween(imgRef.current, { y: '20%', overwrite: 5, ease: Linear.easeNone })
      .addTo(controller)
  }, []);
  return (
    <section
      className={cx({
        'fifty-fifty': true,
        [theme]: true,
        reversed: reverse,
      })}
      style={{ backgroundColor: copyBackgroundColor }}
    >
      <div className="image-block">
        {image && image.sourceUrl && (
          <div className="wrapper">
            <img src={image.sourceUrl} alt={image.alt || 'Foodie image'} ref={imgRef} />
          </div>
        )}
      </div>
      <div className="copy-block">
        <div
          className="arrow arrow-up"
          style={{
            borderBottom: `15px solid ${copyBackgroundColor}`,
          }}
        ></div>
        <div className="wrapper">
          <h4 style={{ color: copyColor }}>{headline}</h4>
          <p
            style={{ color: copyColor }}
            dangerouslySetInnerHTML={{ __html: copyBlock }}
          ></p>
        </div>
      </div>
    </section>
  );
}

export default FiftyFifty;
