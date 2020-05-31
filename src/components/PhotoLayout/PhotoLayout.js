import React from "react"
import * as cx from "classnames"

import "./PhotoLayout.scss"

function Photo({ url, altText, cutline }) {
  return (
    <div className="photo-item">
      <img src={url} alt={altText} />
      <p className="cutline">{cutline}</p>
    </div>
  )
}

function PhotoLayout({
  cutlineOne,
  cutlineTwo,
  imageOne,
  imageTwo,
  split,
  theme,
}) {
  if (!cutlineOne || !cutlineTwo || !imageOne || !imageTwo) {
    return
  }

  const photos = [
    { ...imageOne, cutline: cutlineOne },
    { ...imageTwo, cutline: cutlineTwo },
  ]

  return (
    <section
      className={cx({
        "photo-layout": true,
        [theme]: true,
        "bias-layout": !split,
        "half-layout": split,
      })}
    >
      {photos.map((photo, key) => {
        return (
          <Photo
            key={key}
            url={photo.sourceUrl}
            alt={photo.altText}
            cutline={photo.cutline}
          />
        )
      })}
    </section>
  )
}

export default PhotoLayout
