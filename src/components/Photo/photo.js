import React, { useState } from "react"
import * as cx from "classnames"

// Components
import Plus from "src/svgs/plus"

import "./photo.scss"

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

function PhotoPopup({ title, content }) {
  const [popupOpen, popupOpenSet] = useState(false)

  return (
    <>
      <div
        className={cx({
          popup: true,
          show: popupOpen,
          hide: !popupOpen,
        })}
      >
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
      <button className="open-popup" onClick={() => popupOpenSet(!popupOpen)}>
        <Plus
          className={cx({
            plus: !popupOpen,
            close: popupOpen,
          })}
        />
      </button>
    </>
  )
}

export default function Photo({ data, centered, theme }) {
  return (
    <div
      className={cx({
        photo: true,
        [theme]: true,
        centered,
      })}
    >
      <div className="bg-wrapper">
        <img
          className="bg"
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
        <PhotoPopup
          title={data.text.popup.title}
          content={data.text.popup.content}
        />
      </div>
      <p className="cutline">{data.cutline}</p>
    </div>
  )
}
