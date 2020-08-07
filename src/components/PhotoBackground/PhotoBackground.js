import React, { useState } from 'react';
import * as cx from 'classnames';
import { Parallax } from 'react-scroll-parallax';
import useWindow from 'src/hooks/useWindow';
import { MEDIUM_BREAKPOINT } from 'src/utils/breakpoints';

// Components
import Plus from 'src/svgs/plus';

import './PhotoBackground.scss';

function MessageGrid({ gridCount, message, color, plot, fullScreen }) {
  const grid = Array.from({ length: gridCount }, (x, i) => i);
  const [parallaxDisabled, setParallaxDisabled] = useState(false);
  const _window = useWindow();

  if(_window) {
    _window.addEventListener('resize', () => {
      if (_window.innerWidth < MEDIUM_BREAKPOINT) {
        setParallaxDisabled(true);
      }
      else {
        setParallaxDisabled(false);
      }
    });
  }

  const plotMap = {
    'top left': 0,
    'top right': 2,
    'center left': 3,
    'center right': 5,
    'bottom left': 6,
    'bottom right': 8,
  };

  return (
      <div className="grid">
        {grid.map((cell, i) => {
          if(fullScreen) {
            return (
              <Parallax y={[10, -5]} className="cell" key={i} disabled={parallaxDisabled}>
                {i === plotMap[plot] && (
                  <span dangerouslySetInnerHTML={{ __html: message }} style={{ color }} />
                )}
              </Parallax>
            );
          }
          return (
            <div className="cell" key={i}>
              {i === plotMap[plot] && (
                <span dangerouslySetInnerHTML={{ __html: message }} style={{ color }} />
              )}
            </div>
          )
        })}
      </div>
  );
}

function PhotoPopup({ title, content }) {
  const [popupOpen, popupOpenSet] = useState(false);

  return (
    <>
      <div
        className={cx({
          popup: true,
          show: popupOpen,
          hide: !popupOpen,
        })}
      >
        <div className="popup-wrapper">
          <h4>{title}</h4>
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
          <div className="notch"></div>
        </div>
      </div>
      <button className="open-popup" onClick={() => popupOpenSet(!popupOpen)}>
        <Plus
          className={cx({
            plus: !popupOpen,
            close: popupOpen,
          })}
        />
      </button>
    </>
  );
}

export default function PhotoBackground({
  cutline,
  floatingBodyText,
  floatingTextPosition,
  floatingTextColor,
  fullScreen,
  image,
  popup,
  theme,
  updateParallaxState,
}) {
  return (
    <div
      className={cx({
        photo: true,
        [theme]: true,
        centered: !fullScreen,
      })}
    >
      <div className="bg-wrapper">
        {image && image.sourceUrl && !fullScreen && (
          <Parallax y={[-2, 10]} className="image-container">
            <img
              className="bg"
              src={image.sourceUrl}
              alt={image.altText || 'Image'}
              onLoad={updateParallaxState}
            />
          </Parallax>
        )}
        {image && image.sourceUrl && fullScreen && (
          <img
            className="bg fullscreen"
            src={image.sourceUrl}
            alt={image.altText || 'Image'}
          />
        )}
        <MessageGrid
          gridCount={9}
          message={floatingBodyText}
          color={floatingTextColor}
          plot={floatingTextPosition.toLowerCase()}
          fullScreen={fullScreen}
        />
        {popup.popupCopy && popup.headline && (
          <PhotoPopup title={popup.headline} content={popup.popupCopy} />
        )}
      </div>
      {cutline && <p className="cutline">{cutline}</p>}
    </div>
  );
}
