import React, { useState, useEffect, useRef } from "react";
import * as cx from "classnames";
import { Linear } from 'gsap';
import { isBrowser } from 'src/utils/auth';
import ScrollMagic from 'scrollmagic';

import "./PostHero.scss"

export default function Hero({
  authors,
  byline,
  title,
  heroImage,
  categories,
  theme,
}) {
  const categoryName = categories.length ? categories[0].name : null;
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const imgContainerRef = useRef(null);
  const [scrollMagic, setScrollMagic] = useState({
    controller: isBrowser ? new ScrollMagic.Controller() : null,
  });
  const { controller } = scrollMagic;
  const scaleAnimationTime = 1500;
  const handleImageLoad = () => {
    setLoaded(true);
    if(!isBrowser) return;
    setTimeout(() => {
      imgContainerRef.current.style.overflow = 'initial';
      new ScrollMagic.Scene({
        duration: '200%',
        triggerElement: imgRef.current,
        offset: imgRef.current.offsetHeight - 200,
      })
        .setTween(imgRef.current, { y: '50%', overwrite: 5, ease: Linear.easeNone })
        .addTo(controller)
    }, scaleAnimationTime);
  }
  return (
    <section className={`post-hero ${theme}`}>
      <div className={cx("image-container", { loaded })} ref={imgContainerRef}>
        <div className={cx("image-scale-contianer", { loaded })}>
          {heroImage && heroImage.sourceUrl && (
            <img
              src={heroImage.sourceUrl}
              alt=""
              onLoad={handleImageLoad}
              ref={imgRef}
            />
          )}
        </div>
      </div>
      <div className={cx("block", { loaded })}>
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
            authors.split(",").map(author => {
              return (
                <p className="attribution" key={author}>
                  {author}
                </p>
              )
            })}
        </div>
      </div>
    </section>
  )
}
