import React from "react"

import "./column-icon.scss"

export default function ColumnIcon({ data, theme }) {
  return (
    <div className={`column-icon ${theme}`}>
      {Object.values(data).map((col, i) => {
        return (
          <div className="icon-group" key={i}>
            <img
              className="icon"
              src={col.icon.sourceUrl}
              alt={col.altText || "Icon"}
            />
            <h4 className="headline">{col.iconHeadline}</h4>
            <p className="subhead">{col.iconSubHead}</p>
            <p className="copy">{col.iconText}</p>
          </div>
        )
      })}
    </div>
  )
}
