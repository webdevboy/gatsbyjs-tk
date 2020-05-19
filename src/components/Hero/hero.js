import React from "react"

import "./hero.scss"

export default function Hero({ data, theme }) {
  return (
    <div className={`hero ${theme}`}>
      <div className="image-container">
        <img src={data.heroImage.sourceUrl} alt="" />
      </div>
      <div className="block">
        <p className="name">Destination</p>
        <h1 className="headline">{data.title}</h1>
        <p className="byline">{data.byline}</p>
        <hr />
        {data.authors.length &&
          data.authors.split(",").map(author => {
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
