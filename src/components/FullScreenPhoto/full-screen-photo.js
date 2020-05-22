import React, { useState } from "react"
import * as cx from "classnames"

// Components
import Plus from "src/svgs/plus"

import "./full-screen-photo.scss"

function MessageGrid({ gridCount, message, plot }) {
  const grid = Array.from({ length: gridCount }, (x, i) => i)

  const plotMap = {
    "top left": 0,
    "top right": 2,
    "center left": 3,
    "center right": 5,
    "bottom left": 6,
    "bottom right": 8,
  }

  return (
    <div className="grid">
      {grid.map((cell, i) => {
        return (
          <div className="cell" key={i}>
            {i === plotMap[plot] && <span>{message}</span>}
          </div>
        )
      })}
    </div>
  )
}

export default function FullScreenPhoto({ data, theme }) {
  const [popupOpen, popupOpenSet] = useState(false)

  return (
    <div className={`full-screen-photo ${theme}`}>
      <img
        className="photo"
        src={data.image.sourceUrl}
        alt={data.image.altText || "Image"}
      />
      {window.innerWidth >= 1024 && (
        <MessageGrid
          gridCount={9}
          message={data.text.floatingText.text}
          plot={data.text.floatingText.position.toLowerCase()}
        />
      )}
      <div
        className={cx({
          popup: true,
          show: popupOpen,
          hide: !popupOpen,
        })}
      >
        <h4>{data.text.popup.title}</h4>
        <p>{data.text.popup.content}</p>
      </div>
      <button className="open-popup" onClick={() => popupOpenSet(!popupOpen)}>
        <Plus
          className={cx({
            plus: !popupOpen,
            close: popupOpen,
          })}
        />
      </button>
    </div>
  )
}
