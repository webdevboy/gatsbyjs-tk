import React from 'react';
import * as cx from 'classnames';
import { Parallax } from 'react-scroll-parallax';

import './PhotoLayout.scss';

function Photo({ url, altText, cutline, updateParallaxState = () => {} }) {
  return (
    <div className="photo-item">
      <Parallax y={[-10, 5]}>
        <img src={url} alt={altText || ''} onLoad={updateParallaxState} />
      </Parallax>
      {cutline && <p className="cutline" dangerouslySetInnerHTML={{ __html: cutline }}></p>}
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
  updateParallaxState,
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
            updateParallaxState={updateParallaxState}
          />
        );
      })}
    </section>
  ) : (
    <></>
  );
}

export default PhotoLayout;
