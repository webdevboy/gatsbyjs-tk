import React from "react"
import * as cx from "classnames"

import "./photo-layout.scss"

function Photo({ url, altText, cutline }) {
  return (
    <div className="photo-item">
      <img src={url} alt={altText} />
      <p className="cutline">{cutline}</p>
    </div>
  )
}

function PhotoLayout({ data, theme, layout }) {
  const photos = Object.keys(data.photoLayout1x2).map(
    key => data.photoLayout1x2[key]
  )

  return (
    <div
      className={cx({
        "photo-layout": true,
        [theme]: true,
        split: layout === "split",
        half: layout === "half",
      })}
    >
      {photos.map((photo, key) => {
        return (
          <Photo
            key={key}
            url={photo.image.sourceUrl}
            alt={photo.image.altText}
            cutline={photo.cutline}
          />
        )
      })}
    </div>
  )
}

export default PhotoLayout
