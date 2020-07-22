import React from 'react';

import './Ad.scss';

function Ad({ mobileAd, tabletAd, desktopAd, adUrl }) {
  const smallAd = (mobileAd && mobileAd.sourceUrl) || '';
  const mediumAd = (tabletAd && tabletAd.sourceUrl) || '';
  const largeAd = (desktopAd && desktopAd.sourceUrl) || '';

  if (!smallAd || !mediumAd || !largeAd) return null;
  console.log(adUrl)
  return (
    <div className="ad">
      <div className="container">
        <div className="ad__img-container">
          <div className="ad__img-wrapper">
            <a href={adUrl || ''} target="_blank">
              <picture>
                <source srcSet={largeAd} media="(min-width: 1440px)" />
                <source srcSet={mediumAd} media="(min-width: 834px)" />
                <img className="ad__img" src={smallAd} alt="Ad" />
              </picture>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ad;
