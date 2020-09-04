import React, { useState } from "react"
import * as cx from "classnames"
import AdaptiveImage from 'src/components/common/AdaptiveImage/AdaptiveImage';

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
      <AdaptiveImage
            src={data.image.sourceUrl}
            smallSrc={data.mobileImage.sourceUrl && data.mobileImage.sourceUrl}
            innerProps={{
              onLoad: handleHeroLoad,
              className: cx("featured-image", { loaded })
            }}
        />
        <div className="page-hero__scroll-down">
          <ScrollDownArrow />
        </div>  
      </div>
      {data.overlay && <div className="overlay"></div>}
    </section>
  )
}
