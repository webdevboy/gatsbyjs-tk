import React, { useState, useEffect, useRef } from 'react';
import { Linear } from 'gsap';
import { isBrowser } from 'src/utils/auth';
import ScrollMagic from 'scrollmagic';

import './Ad.scss';

function Ad({ mobileAd, tabletAd, desktopAd }) {
  const imgRef = useRef(null);
  const [scrollMagic, setScrollMagic] = useState({
    controller: isBrowser ? new ScrollMagic.Controller() : null,
  });
  const { controller } = scrollMagic;

  const smallAd = (mobileAd && mobileAd.sourceUrl) || '';
  const mediumAd = (tabletAd && tabletAd.sourceUrl) || '';
  const largeAd = (desktopAd && desktopAd.sourceUrl) || '';

  useEffect(() => {
    if (!isBrowser) return;

    new ScrollMagic.Scene({
      duration: '200%',
      triggerElement: imgRef.current,
    })
      .setTween(imgRef.current, {
        y: '20%',
        ease: Linear.easeNone,
        overwrite: 5,
      })
      .addTo(controller);
  }, []);

  if (!smallAd || !mediumAd || !largeAd) return null;

  return (
    <div className="ad">
      <div className="container">
        <div className="ad__img-container">
          <div className="ad__img-wrapper">
            <picture>
              <source srcSet={largeAd} media="(min-width: 1440px)" />
              <source srcSet={mediumAd} media="(min-width: 834px)" />
              <img className="ad__img" src={smallAd} alt="Ad" ref={imgRef} />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ad;
