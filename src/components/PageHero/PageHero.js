import React from "react"

import "./PageHero.scss"

export default function PageHero({ logo, image }) {
  return (
    <div className="page-hero">
      <div className="image-container">
        <img src={image.sourceUrl} alt={image.altText} />
      </div>
      <img src={logo.sourceUrl} alt={logo.altText} />
    </div>
  )
}
