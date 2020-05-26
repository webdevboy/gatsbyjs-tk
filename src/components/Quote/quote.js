import React from "react"

import "./Quote.scss"

export default function Quote({ quote }) {
  return (
    <div className="quote">
      <blockquote>
        <p>{quote}</p>
      </blockquote>
    </div>
  )
}
