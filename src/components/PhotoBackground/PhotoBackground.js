import React, { useState } from "react"
import * as cx from "classnames"

// Components
import Plus from "src/svgs/plus"

import "./PhotoBackground.scss"

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
            {i === plotMap[plot] && (
              <span dangerouslySetInnerHTML={{ __html: message }}></span>
            )}
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
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
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

export default function PhotoBackground({
  cutline,
  floatingBodyText,
  floatingTextPosition,
  fullScreen,
  image,
  popup,
  theme,
}) {
  return (
    <div
      className={cx({
        photo: true,
        [theme]: true,
        centered: !fullScreen,
      })}
    >
      <div className="bg-wrapper">
        {image && image.sourceUrl && (
          <img
            className="bg"
            src={image.sourceUrl}
            alt={image.altText || "Image"}
          />
        )}
        <MessageGrid
          gridCount={9}
          message={floatingBodyText}
          plot={floatingTextPosition.toLowerCase()}
        />
        {popup.popupCopy && popup.headline && (
          <PhotoPopup title={popup.headline} content={popup.popupCopy} />
        )}
      </div>
      {cutline && <p className="cutline">{cutline}</p>}
    </div>
  )
}
