import React, { useState, useEffect } from 'react';

import {
  MEDIUM_BREAKPOINT,
  LARGE_BREAKPOINT,
} from 'src/utils/breakpoints';
import useWindow from 'src/hooks/useWindow';

function AdaptiveImage({ src, smallSrc, mediumSrc, innerProps, skeletonActive }) {
  const _window = useWindow();
  const [width, setWidth] = useState(_window ? _window.innerWidth : LARGE_BREAKPOINT);
 
  useEffect(() => {
    let windowResizeListener = null;
    if(_window) {
      setWidth(_window.innerWidth);
      windowResizeListener = _window.addEventListener('resize', () => {
        setWidth(_window.innerWidth);
      });
    }
    return () => {
      if(_window && windowResizeListener) {
        _window.removeEventListener(windowResizeListener);
      }
    }
  }, []);

  if(width < MEDIUM_BREAKPOINT && smallSrc) {
    return <img src={smallSrc} alt="" {...innerProps} />
  }
  else if(width < LARGE_BREAKPOINT && width > MEDIUM_BREAKPOINT && mediumSrc) {
    return <img src={mediumSrc} alt="" {...innerProps} />
  }
  else if(width > LARGE_BREAKPOINT) {
    return <img src={src} alt="" {...innerProps} />;
  }
  
  return null;
} 

export default AdaptiveImage;
