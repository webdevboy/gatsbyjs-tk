import React from "react"

import "./PostHero.scss"

export default function Hero({ authors, byline, title, heroImage }) {
  return (

    <div className="post-hero">
      <div className="image-container">
        {heroImage && heroImage.sourceUrl && (
          <img src={heroImage.sourceUrl} alt="" />
        )}
      </div>
      <div className="block">
        <p className="name">Destination</p>
        <h1 className="headline">{title}</h1>
        <p className="byline">{byline}</p>
        <hr />
        {authors.length &&
          authors.split(",").map(author => {
            return (
              <p className="attribution" key={author}>
                {author}
              </p>
            )
          })}
      </div>
    </div>
  )
}
