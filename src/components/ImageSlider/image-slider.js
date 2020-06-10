import React from "react"

import "./image-slider.scss"

export default function ImageSlider({ data, theme }) {
  const photos = Object.values(data.photoLayout1x3)

  return (
    <div className={`image-slider ${theme}`}>
      {photos.map((photo, key) => {
        return (
          <div className="slide" key={key}>
            <div className="img-wrap">
              <img
                src={photo.image.sourceUrl}
                alt={photo.image.altText || "Photo"}
              />
            </div>
            <p className="cutline">{photo.cutline}</p>
          </div>
        )
      })}
    </div>
  )
}
