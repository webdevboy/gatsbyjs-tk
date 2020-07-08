import React, { useState, useEffect, useRef } from "react";
import { Linear } from 'gsap';
import { isBrowser } from 'src/utils/auth';
import ScrollMagic from 'scrollmagic';


import "./Ad.scss"

function Ad({ image }) {
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
      .setTween(imgRef.current, { y: '40%', ease: Linear.easeNone, overwrite: 5 })
      .addTo(controller)
  }, []);
  if (!image && !image.sourceUrl) return null
  return (
    <div className="ad">
      <div className="container">
        <div className="ad__img-container">
          <div className="ad__img-wrapper">
            <img
              className="ad__img"
              src={image.sourceUrl}
              ref={imgRef}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ad
