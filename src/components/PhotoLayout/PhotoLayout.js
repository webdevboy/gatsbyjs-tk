import React, { useState, useEffect, useRef } from 'react';
import * as cx from 'classnames';
import { Linear } from 'gsap';
import { isBrowser } from 'src/utils/auth';
import ScrollMagic from 'scrollmagic';

import './PhotoLayout.scss';

function Photo({ url, altText, cutline }) {
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
    <div className="photo-item">
      <img src={url} alt={altText} ref={imgRef} />
      {cutline && <p className="cutline">{cutline}</p>}
    </div>
  );
}

function PhotoLayout({
  cutlineOne,
  cutlineTwo,
  imageOne,
  imageTwo,
  split,
  theme,
}) {
  const photos = [
    { ...imageOne, cutline: cutlineOne },
    { ...imageTwo, cutline: cutlineTwo },
  ];

  return photos.length ? (
    <section
      className={cx({
        'photo-layout': true,
        [theme]: true,
        'bias-layout': !split,
        'half-layout': split,
      })}
    >
      {photos.map((photo, key) => {
        return (
          <Photo
            key={key}
            url={photo.sourceUrl}
            alt={photo.altText}
            cutline={photo.cutline}
          />
        );
      })}
    </section>
  ) : (
    <></>
  );
}

export default PhotoLayout;
