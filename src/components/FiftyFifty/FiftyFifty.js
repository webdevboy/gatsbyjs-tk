import React from "react"
import * as cx from "classnames"

import "./FiftyFifty.scss"

function FiftyFifty({
  copyBlock,
  headline,
  image,
  preHeadline,
  reverse,
  linkText,
  linkUrl,
  copyBackgroundColor,
  imageBackgroundColor,
  theme,
}) {
  return (
    <section
      className={cx({
        "fifty-fifty": true,
        [theme]: true,
        reversed: reverse,
      })}
    >
      <div
        className="image-block"
        style={{ backgroundColor: imageBackgroundColor }}
      >
        {image.sourceUrl && (
          <div className="wrapper">
            <img src={image.sourceUrl} alt={image.alt || "Foodie image"} />
          </div>
        )}
      </div>
      <div
        className="copy-block"
        style={{ backgroundColor: copyBackgroundColor }}
      >
        {!reverse && <div className="arrow arrow-up"></div>}
        <div className="wrapper">
          <h4>{headline}</h4>
          <p dangerouslySetInnerHTML={{ __html: copyBlock }}></p>
        </div>
        {reverse && <div className="arrow  arrow-down"></div>}
      </div>
    </section>
  )
}

export default FiftyFifty
