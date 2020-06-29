import React, { useState } from "react"
import { useSwipeable } from "react-swipeable"
import useWindow from "src/hooks/useWindow"
import * as cx from "classnames"

import "./PageHero.scss"

export default function PageHero({ data, hideHero }) {
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
      style={{
        height: _window.outerHeight,
      }}
      onWheel={event => {
        if (event.deltaY > 0) {
          hideHero()
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
      </div>
      {data.overlay && <div className="overlay"></div>}
    </section>
  )
}
