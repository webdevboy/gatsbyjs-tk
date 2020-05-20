import React from "react"

import "./quote.scss"

export default function Quote({ data, theme }) {
  console.log(data)
  return (
    <div className={`quote ${theme}`}>
      <blockquote>
        <p>{data.quote}</p>
      </blockquote>
    </div>
  )
}
