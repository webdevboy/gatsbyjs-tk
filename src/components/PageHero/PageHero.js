import React from "react"

import "./PageHero.scss"

export default function PageHero({ logo, image }) {
  return (
    image &&
    image.sourceUrl &&
    logo &&
    logo.sourceUrl && (
      <div className="page-hero">
        <div className="image-container">
          <img src={image.sourceUrl} alt={image.altText} />
        </div>
        <img src={logo.sourceUrl} alt={logo.altText} />
      </div>
    )
  )
}
