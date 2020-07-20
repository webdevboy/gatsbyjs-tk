import React, { useState, useEffect, useRef } from 'react';
import { Parallax } from 'react-scroll-parallax';

import "./PhotoLayout1X3.scss";

function PhotoLayout1X3Slide({ photo, updateParallaxState }) {
  return (
    <div className="slide">
      <Parallax y={[-10, 5]} className="img-wrap">
        <img
          src={photo.image.sourceUrl}
          alt={photo.image.altText || "Photo"}
          onLoad={updateParallaxState}
        />
      </Parallax>
      <p className="cutline">{photo.cutline}</p>
    </div>
  );
}

export default function PhotoLayout1X3({ content, theme, updateParallaxState }) {
  
  return (
    <div className={`photo-layout-1x3 ${theme}`}>
      {content && content.map((photo, key) => {
        return (
          <PhotoLayout1X3Slide {...{ photo, key, updateParallaxState }} />
        )
      })}
    </div>
  )
}
