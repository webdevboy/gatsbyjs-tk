import React from "react"

import "./Quote.scss"

export default function Quote({ quote, theme }) {
  return (
    <section className={`quote ${theme}`}>
      <blockquote>
        <p dangerouslySetInnerHTML={{ __html: `"${quote}"` }}></p>
      </blockquote>
    </section>
  )
}
