import React from "react"

import "./column-copy.scss"

function ColumnCopy({ data, theme }) {
  return (
    <div className={`column-copy ${theme}`}>
      {Object.keys(data).map((col, i) => {
        return (
          <div
            className="col"
            key={i}
            dangerouslySetInnerHTML={{ __html: data[col] }}
          ></div>
        )
      })}
    </div>
  )
}

export default ColumnCopy
