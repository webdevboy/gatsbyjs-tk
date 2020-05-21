import React from "react"

import "./quote.scss"

export default function Quote({ data, theme }) {
  return (
    <div className={`quote ${theme}`}>
      <blockquote>
        <p>{data.quote}</p>
      </blockquote>
    </div>
  )
}
