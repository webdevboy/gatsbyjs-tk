import React, { useState, useEffect } from 'react';
import * as cx from 'classnames';
import { Parallax, useController } from 'react-scroll-parallax';

// Components
import Plus from 'src/svgs/plus';

import './PhotoBackground.scss';

function MessageGrid({ gridCount, message, plot, fullScreen }) {
  const grid = Array.from({ length: gridCount }, (x, i) => i);

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
              <Parallax y={[50, -30]} className="cell" key={i}>
                {i === plotMap[plot] && (
                  <span dangerouslySetInnerHTML={{ __html: message }}></span>
                )}
              </Parallax>
            );
          }
          return (
            <div className="cell" key={i}>
              {i === plotMap[plot] && (
                <span dangerouslySetInnerHTML={{ __html: message }}></span>
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
  fullScreen,
  image,
  popup,
  theme,
}) {
  const { parallaxController } = useController();
  useEffect(() => {
    setTimeout(parallaxController.update, 0);
  }, []);
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
          <Parallax y={[-20, 20]} className="image-container">
            <img
              className="bg"
              src={image.sourceUrl}
              alt={image.altText || 'Image'}
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
