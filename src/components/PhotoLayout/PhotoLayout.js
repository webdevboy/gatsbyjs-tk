import React from 'react';
import * as cx from 'classnames';
import { Parallax } from 'react-scroll-parallax';

import './PhotoLayout.scss';

function Photo({ url, altText, cutline }) {
  return (
    <Parallax y={[-20, 20]} className="photo-item">
      <img src={url} alt={altText} />
      {cutline && <p className="cutline">{cutline}</p>}
    </Parallax>
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
