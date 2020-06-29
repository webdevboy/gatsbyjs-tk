import React, { useState } from "react"
import * as cx from "classnames"

import "./PostHero.scss"

export default function Hero({
  authors,
  byline,
  title,
  heroImage,
  categories,
  theme,
}) {
  const categoryName = categories.length ? categories[0].name : null
  const [loaded, setLoaded] = useState(false)

  return (
    <section className={`post-hero ${theme}`}>
      <div className={cx("image-container", { loaded })}>
        {heroImage && heroImage.sourceUrl && (
          <img
            src={heroImage.sourceUrl}
            alt=""
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      <div className={cx("block", { loaded })}>
        <div className="block-wrapper">
          {categoryName && (
            <p
              className="category-name"
              dangerouslySetInnerHTML={{ __html: categoryName }}
            ></p>
          )}
          {title && <h1 className="headline">{title}</h1>}
          {byline && <p className="byline">{byline}</p>}
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
    </section>
  )
}
