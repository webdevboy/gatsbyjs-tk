import React, { useState } from "react"
import * as cx from "classnames"

import "./PageHero.scss";
import { ScrollDownArrow } from 'src/components/common';

export default function PageHero({ data, setHomeHeroLoaded }) {
  const [loaded, setLoaded] = useState(false);

  const handleHeroLoad = () => {
    setHomeHeroLoaded(true);
    setLoaded(true);
  }

  return (
    <section className="page-hero">
      <div className="featured-image-container">
        <img
          className={cx("featured-image", { loaded })}
          src={data.image.sourceUrl || ""}
          alt={data.image.altText}
          onLoad={handleHeroLoad}
        />
        <div className="page-hero__scroll-down">
          <ScrollDownArrow />
        </div>  
      </div>
      {data.overlay && <div className="overlay"></div>}
    </section>
  )
}
