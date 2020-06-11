import React, { useState, useEffect } from "react"
import { MEDIUM_BREAKPOINT, LARGE_BREAKPOINT } from "src/utils/breakpoints"

import "./CopyColumns.scss"

export default function CopyColumns({ columns, theme }) {
  const [layout, setLayout] = useState("")

  const handleLayout = () => {
    if (
      window.innerWidth >= MEDIUM_BREAKPOINT &&
      window.innerWidth < LARGE_BREAKPOINT
    ) {
      setLayout(`repeat(${columns.length}, 2fr)`)
      return
    }

    if (window.innerWidth >= LARGE_BREAKPOINT) {
      setLayout(`1fr repeat(${columns.length}, 2fr) 1fr`)
      return
    }

    if (window.innerWidth < MEDIUM_BREAKPOINT) {
      setLayout("")
      return
    }
  }

  useEffect(() => {
    window.addEventListener("resize", () => handleLayout())
    handleLayout()
  }, [])

  return (
    <section
      className={`copy-columns ${theme}`}
      style={{ gridTemplateColumns: layout }}
    >
      {columns.map((col, i) => {
        return (
          <div className="group" key={i}>
            {col.icon && (
              <span className="icon-container">
                <img
                  className="icon"
                  src={col.icon.sourceUrl}
                  alt={col.altText || "Icon"}
                />
              </span>
            )}
            {col.headline && <h4 className="headline">{col.headline}</h4>}
            {col.iconSubHeader && (
              <p className="subhead">{col.iconSubHeader}</p>
            )}
            <p className="copy">{col.columnCopy}</p>
          </div>
        )
      })}
    </section>
  )
}
