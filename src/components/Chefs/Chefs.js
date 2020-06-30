import React from "react"
import Swiper from "react-id-swiper"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import { MEDIUM_BREAKPOINT } from "src/utils/breakpoints"
import { getFormattedArticle } from "src/utils/formatArticle"
import convertLinkLocale from 'src/utils/convertLinkLocale';


import "./Chefs.scss"

function Chef({ cutline, title, byline, imageUrl, articleUrl }) {
  const [t, i18n] = useTranslation('article');
  return (
    <div className="chefs__columns__column">
      {imageUrl && (
        <div className="chefs__columns__column__img__wrapper">
          <div
            className="chefs__columns__column__img"
            style={{ backgroundImage: `url("${imageUrl}")` }}
          />
        </div>
      )}
      <div className="chefs__columns__column__info">
        {cutline && (
          <div className="chefs__columns__column__info_cutline">{cutline}</div>
        )}
        {title && (
          <div className="chefs__columns__column__info_title">{title}</div>
        )}

        {byline && (
          <div className="chefs__columns__column__info_description">
            {byline}
          </div>
        )}

        <div className="chefs__columns__column__info_more">
          <Link
            to={convertLinkLocale(articleUrl, i18n.language)}
            className="chefs__columns__column__info_more__link"
          >
            {t('read-more')}
          </Link>
        </div>
      </div>
    </div>
  )
}
function Chefs({ column1, column2, column3 }) {
  const [t, i18n] = useTranslation('common');
  const params = {
    spaceBetween: 20,
    slidesPerView: 1.5,
    noSwiping: false,
    scrollbar: {
      el: ".chefs__scrollbar",
      hide: false,
      draggable: true,
      dragSize: 187,
    },
    breakpoints: {
      [MEDIUM_BREAKPOINT]: {
        slidesPerView: 3,
        spaceBetween: 41,
        noSwiping: true,
        allowSlidePrev: false,
        allowSlideNext: false,
        scrollbar: {
          hide: true,
        },
      },
    },
  }

  return (
    <div className="chefs">
      <div className="container">
        <div className="chefs__title">{t('chefs-profile')}</div>
        <div className="chefs__columns">
          <Swiper {...params}>
            {column1 && (
              <div>
                <Chef {...getFormattedArticle(column1)} />
              </div>
            )}
            {column2 && (
              <div>
                <Chef {...getFormattedArticle(column2)} />
              </div>
            )}
            {column3 && (
              <div>
                <Chef {...getFormattedArticle(column3)} />
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Chefs
