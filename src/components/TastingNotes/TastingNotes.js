import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Swiper from "react-id-swiper"
import cx from "classnames"

import { getFormattedArticle } from "src/utils/formatArticle"
import {
  MEDIUM_BREAKPOINT,
  LARGE_BREAKPOINT,
  XLARGE_BREAKPOINT,
} from "src/utils/breakpoints"
import "./TastingNotes.scss"

const Note = ({ cutline, title, byline, imageUrl, articleUrl }) => (
  <div className="tasting-notes__note">
    {imageUrl && (
      <img src={imageUrl} className="tasting-notes__note__img" alt="" />
    )}
    {cutline && (
      <div
        className="tasting-notes__note__cutline"
        dangerouslySetInnerHTML={{ __html: cutline }}
      ></div>
    )}
    {title && <div className="tasting-notes__note__title">{title}</div>}
    {byline && <div className="tasting-notes__note__byline">{byline}</div>}
    {articleUrl && (
      <div className="tasting-notes__note__more">
        <Link to={articleUrl} className="tasting-notes__note__more__link">
          Read More
        </Link>
      </div>
    )}
  </div>
)

function TastingNotes({ headline, notes, type, theme }) {
  const [moreThanMedium, setMoreThanMedium] = useState(false)
  const [moreThanLarge, setMoreThanLarge] = useState(false)

  const setResizeData = width => {
    if (width < MEDIUM_BREAKPOINT) {
      setMoreThanMedium(false)
      setMoreThanLarge(false)
    } else if (width > MEDIUM_BREAKPOINT && width < LARGE_BREAKPOINT) {
      setMoreThanMedium(true)
      setMoreThanLarge(false)
    } else if (width > LARGE_BREAKPOINT) {
      setMoreThanLarge(true)
      setMoreThanMedium(false)
    }
  }
  useEffect(() => {
    window.addEventListener("resize", e => {
      setResizeData(+e.target.screen.width)
    })
  }, [])

  const params = {
    spaceBetween: 20,
    slidesPerView: 1.5,
    noSwiping: false,
    scrollbar: {
      el: ".tasting-notes__scrollbar",
      hide: false,
      draggable: true,
      dragSize: 68,
    },
    breakpoints: {
      [MEDIUM_BREAKPOINT]: {
        slidesPerView: 4.5,
        spaceBetween: 41,
        scrollbar: {
          dragSize: 125,
        },
      },
      [XLARGE_BREAKPOINT]: {
        slidesPerView: 6.3,
        spaceBetween: 41,
        scrollbar: {
          dragSize: 125,
        },
      },
    },
  }

  return (
    <div className={`tasting-notes ${theme}`}>
      <div className="tasting-notes__title">
        {headline ? headline : "Tasting Notes"}
      </div>
      <div className="tasting-notes__slider-container">
        <div className={cx({ hidden: moreThanMedium && !moreThanLarge })}>
          <Swiper {...params}>
            {notes &&
              notes.length > 0 &&
              notes.map((note, index) => (
                <div key={index}>
                  <Note {...getFormattedArticle(note.note)} />
                </div>
              ))}
          </Swiper>
        </div>
        {moreThanMedium && !moreThanLarge && (
          <div className="tasting-notes__medium-size">
            {notes &&
              notes.length > 0 &&
              notes.map((note, index) => (
                <Note {...getFormattedArticle(note.note)} key={index} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TastingNotes
