import React, { useState, useEffect, useRef } from 'react';
import * as cx from 'classnames';
import { isBrowser } from 'src/utils/auth';
import { Parallax } from 'react-scroll-parallax';

import './PostHero.scss';
import AdaptiveImage from 'src/components/common/AdaptiveImage/AdaptiveImage';

export default function Hero({
  authors,
  byline,
  title,
  heroImage,
  mobileHeroImage,
  categories,
  theme,
  updateParallaxState,
}) {
  const categoryName = categories && categories.length ? categories[0].name : null;
  const imgContainerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const scaleAnimationTime = 1500;
  const handleImageLoad = () => {
    if (!isBrowser) return;
    setLoaded(true);
    setTimeout(() => {
      document.documentElement.classList.remove('no-scrolling');
      updateParallaxState();
    }, scaleAnimationTime);
  };
  useEffect(() => {
    document.documentElement.classList.add('no-scrolling');
  }, []);
  return (
    <section className={`post-hero ${theme}`}>
      <Parallax y={[-26, 20]}>
        <div className={cx('image-container', { loaded })} ref={imgContainerRef}>
            <div className={cx('image-scale-contianer', { loaded })}>
              {heroImage && heroImage.sourceUrl && (
                <AdaptiveImage
                  src={heroImage.sourceUrl}
                  smallSrc={mobileHeroImage && mobileHeroImage.sourceUrl}
                  innerProps={{
                    onLoad: handleImageLoad,
                  }}
                />
              )}
            </div>
        </div>
      </Parallax>
      <div className={cx('block', { loaded })}>
        <div className="block-wrapper">
          {categoryName && (
            <p
              className="category-name"
              dangerouslySetInnerHTML={{ __html: categoryName }}
            />
          )}
          {title && <h1 className="headline">{title}</h1>}
          {byline && <p className="byline">{byline}</p>}
          <hr />
          {authors && authors.length &&
            authors.split(',').map((author) => {
              return (
                <p className="attribution" key={author}>
                  {author}
                </p>
              );
            })}
        </div>
      </div>
    </section>
  );
}
