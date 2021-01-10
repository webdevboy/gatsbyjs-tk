import React, { useState } from 'react';
import * as cx from 'classnames';
import AdaptiveImage from 'src/components/common/AdaptiveImage/AdaptiveImage';
import { Parallax } from 'react-scroll-parallax';

// Components
import Plus from 'src/svgs/plus';

import './FullscreenPhoto.scss';

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
          <button  className={cx({
                'open-popup': true,
                "mobile-close": true
              })} onClick={() => popupOpenSet(!popupOpen)}>
            <Plus
              className={cx({
                plus: !popupOpen,
                close: popupOpen
              })}
            />
          </button>
          <h4 dangerouslySetInnerHTML={{ __html: title }}></h4>
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
  headlineOne,
  headlineTwo,
  headlineOneColor,
  headlineTwoColor,
  desktopImage,
  tabletImage,
  mobileImage,
  popup,
  theme,
  updateParallaxState = () => {}
}) {
  return (
    <div
      className={cx({
        photo: true,
        [theme]: true
      })}
    >
      <div className="bg-wrapper">
        <div className="headlines-wrapper">
          <div className="headline-one" style={{ color: headlineOneColor }}>{headlineOne}</div>
          <div className="headline-two" style={{ color: headlineTwoColor }}>{headlineTwo}</div>
        </div>
        <Parallax y={[-15, 20]}>
        <AdaptiveImage
            src={desktopImage.sourceUrl}
            mediumSrc={tabletImage && tabletImage.sourceUrl}
            smallSrc={mobileImage && mobileImage.sourceUrl}
            innerProps={{
              onLoad: updateParallaxState,
              className: "bg fullscreen"
            }}
          />
        </Parallax>
        {popup.popupCopy && popup.headline && (
          <PhotoPopup title={popup.headline} content={popup.popupCopy} />
        )}
      </div>
    </div>
  );
}
