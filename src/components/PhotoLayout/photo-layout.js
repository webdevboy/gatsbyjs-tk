import React, { useState } from "react"

import "./photo-layout.scss"

function Photo({ url, altText, cutline }) {
  const [height, heightSet] = useState("")

  return (
    <div className="photo-item">
      <img src={url} alt={altText} />
      <p className="cutline">{cutline}</p>
    </div>
  )
}

function PhotoLayout({ data, theme, reversed }) {
  const photoOrder = reversed
    ? Object.keys(data.photoLayout1x2).reverse()
    : Object.keys(data.photoLayout1x2)

  const photos = photoOrder.map(key => data.photoLayout1x2[key])

  return (
    <div className={`photo-layout ${theme}`}>
      {photos.map(photo => {
        return (
          <Photo
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
