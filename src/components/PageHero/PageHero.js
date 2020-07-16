import React, { useState } from "react"
import { useSwipeable } from "react-swipeable"
import useWindow from "src/hooks/useWindow"
import * as cx from "classnames"

import "./PageHero.scss";
import { ScrollDownArrow } from 'src/components/common';

export default function PageHero({ data, hideHero, scrollContainer }) {
  const [loaded, setLoaded] = useState(false)
  const _window = useWindow() || {}

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      hideHero()
    },
    trackMouse: true,
  })

  return (
    <section
      className="page-hero"
      onWheel={event => {
        if (event.deltaY > 0) {
          hideHero();
        }
      }}
      {...swipeHandlers}
    >
      <div className="featured-image-container">
        <img
          className={cx("featured-image", { loaded })}
          src={data.image.sourceUrl || ""}
          alt={data.image.altText}
          onLoad={() => setLoaded(true)}
        />
        <div className="page-hero__scroll-down">
          <ScrollDownArrow />
        </div>  
      </div>
      {data.overlay && <div className="overlay"></div>}
    </section>
  )
}
