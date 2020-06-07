import React from "react"

import "./PhotoLayout1X3.scss"

export default function PhotoLayout1X3({ content, theme }) {
  return (
    <div className={`photo-layout-1x3 ${theme}`}>
      {content.map((photo, key) => {
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
