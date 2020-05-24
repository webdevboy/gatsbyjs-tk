import React from "react"

import "./quote.scss"

export default function Quote({ quote }) {
  return (
    <div >
      <blockquote>
        <p>{quote}</p>
      </blockquote>
    </div>
  )
}
