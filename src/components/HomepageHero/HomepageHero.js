import React from "react"

import "./HomepageHero.scss"

export default function HomepageHero({ logo, image }) {
  return (
    image && image.sourceUrl &&
    logo && logo.sourceUrl && (
      <div className="homepage-hero">
        <div className="image-container">
          <img src={image.sourceUrl} alt={image.altText} />
        </div>
        <img src={logo.sourceUrl} alt={logo.altText} />
      </div>
    )
  )
}