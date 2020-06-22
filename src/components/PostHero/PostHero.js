import React from "react"

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

  return (
    <section className={`post-hero ${theme}`}>
      <div className="image-container">
        {heroImage && heroImage.sourceUrl && (
          <img src={heroImage.sourceUrl} alt="" />
        )}
      </div>
      <div className="block">
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
