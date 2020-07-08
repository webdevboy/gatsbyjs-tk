import React, { useState, useEffect, useRef } from 'react';
import { Linear } from 'gsap';
import { isBrowser } from 'src/utils/auth';
import ScrollMagic from 'scrollmagic';

import "./PhotoLayout1X3.scss";

function PhotoLayout1X3Slide({ photo }) {
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
      .setTween(imgRef.current, { y: '40%', overwrite: 5, ease: Linear.easeNone })
      .addTo(controller)
  }, []);
  return (
    <div className="slide">
      <div className="img-wrap">
        <img
          src={photo.image.sourceUrl}
          alt={photo.image.altText || "Photo"}
          ref={imgRef}
        />
      </div>
      <p className="cutline">{photo.cutline}</p>
    </div>
  );
}

export default function PhotoLayout1X3({ content, theme }) {
  
  return (
    <div className={`photo-layout-1x3 ${theme}`}>
      {content.map((photo, key) => {
        return (
          <PhotoLayout1X3Slide {...{ photo, key }} />
        )
      })}
    </div>
  )
}
