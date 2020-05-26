import React from "react"

import "./Quote.scss"

export default function Quote({ quote }) {
  return (
    <section className="quote">
      <blockquote>
        <p>"{quote}"</p>
      </blockquote>
    </section>
  )
}
