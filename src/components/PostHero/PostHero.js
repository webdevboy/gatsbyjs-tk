import React, { useState, useEffect, useRef } from 'react';
import * as cx from 'classnames';
import { isBrowser } from 'src/utils/auth';
import { Parallax, useController } from 'react-scroll-parallax';

import './PostHero.scss';
import useDocument from 'src/hooks/useDocument';

export default function Hero({
  authors,
  byline,
  title,
  heroImage,
  categories,
  theme,
  pageScroll,
}) {
  const { parallaxController } = useController();
  const categoryName = categories.length ? categories[0].name : null;
  const imgContainerRef = useRef(null);
  const _document = useDocument();
  const [loaded, setLoaded] = useState(false);
  const scaleAnimationTime = 1500;
  const handleImageLoad = () => {
    if (!isBrowser) return;
    setLoaded(true);
    setTimeout(() => {
      parallaxController.update();
      if (imgContainerRef && imgContainerRef.current) {
        imgContainerRef.current.style.overflow = 'initial';
      }
      if (pageScroll && pageScroll.current) {
        pageScroll.current.style.overflowY = 'auto';
        pageScroll.current.classList.add('scrollable');
      }
    }, scaleAnimationTime);
  };
  useEffect(() => {
    if (pageScroll && pageScroll.current) {
      pageScroll.current.style.overflowY = 'hidden';
    }
  }, []);
  return (
    <section className={`post-hero ${theme}`}>
      <div className={cx('image-container', { loaded })} ref={imgContainerRef}>
        <Parallax y={[-40, 20]} className={cx('image-scale-contianer', { loaded })}>
          {heroImage && heroImage.sourceUrl && (
            <img
              src={heroImage.sourceUrl}
              alt=""
              onLoad={handleImageLoad}
            />
          )}
        </Parallax>
      </div>
      <div className={cx('block', { loaded })}>
        <div className="block-wrapper">
          {categoryName && (
            <p
              className="category-name"
              dangerouslySetInnerHTML={{ __html: categoryName }}
            ></p>
          )}
          {title && <h1 className="headline">{title}</h1>}
          {byline && <p className="byline">{byline}</p>}
          <hr />
          {authors.length &&
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
