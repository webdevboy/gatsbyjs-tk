import React from "react"

import "./Ad.scss"

function Ad({ image }) {
  if (!image && !image.sourceUrl) return null
  return (
    <div className="ad container">
      <div className="ad__img-container">
        <div
          className="ad__img"
          style={{ backgroundImage: `url("${image.sourceUrl}")` }}
        ></div>
      </div>
    </div>
  )
}

export default Ad
