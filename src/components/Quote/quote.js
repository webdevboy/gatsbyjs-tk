import React from "react"

import "./Quote.scss"

export default function Quote({ quote, theme }) {
  return (
    // <section className="quote">
    <section className={`quote ${theme}`}>
      <blockquote>
        <p>"{quote}"</p>
      </blockquote>
    </section>
  )
}
