import React, { useState, useEffect, useRef } from 'react';
import Swiper from "react-id-swiper";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { Linear } from 'gsap';
import { isBrowser } from 'src/utils/auth';


import { MEDIUM_BREAKPOINT, LARGE_BREAKPOINT } from "src/utils/breakpoints"
import { getFormattedArticle } from "src/utils/formatArticle"
import convertLinkLocale from 'src/utils/convertLinkLocale';

import "../Chefs/Chefs.scss"
import "./SociallyConnected.scss"

function SociallyConnectedItem({
  cutline,
  title,
  byline,
  imageUrl,
  articleUrl,
}) {
  const [t, i18n] = useTranslation('article');
  return (
    <div className="socially__columns__column">
      {imageUrl && (
        <div className="socially__columns__column__img__wrapper">
          <img
            className="socially__columns__column__img"
            src={imageUrl}
            alt=""
          />
        </div>
      )}

      <div className="socially__columns__column__info">
        {cutline && (
          <div className="socially__columns__column__info_cutline">
            {cutline}
          </div>
        )}
        {title && (
          <div className="socially__columns__column__info_title">{title}</div>
        )}
        {byline && (
          <div className="socially__columns__column__info_description">
            {byline}
          </div>
        )}

        <div className="socially__columns__column__info_more">
          <Link
            className="socially__columns__column__info_more__link"
            to={convertLinkLocale(articleUrl, i18n.language)}
          >
            {t('read-more')}
          </Link>
        </div>
      </div>
    </div>
  )
}
function SociallyConnected({ column1, column2, column3 }) {
  const [t, i18n] = useTranslation('common');
  const params = {
    spaceBetween: 20,
    slidesPerView: 1.5,
    noSwiping: false,
    scrollbar: {
      el: ".socially__scrollbar",
      hide: false,
      draggable: true,
      dragSize: 68,
    },
    breakpoints: {
      [MEDIUM_BREAKPOINT]: {
        slidesPerView: 2,
        spaceBetween: 41,
        noSwiping: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        scrollbar: {
          dragSize: 126,
        },
      },
      [LARGE_BREAKPOINT]: {
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
    <div className="socially-connected">
      <div className="container">
        <div className="socially__title">{t('socially-connected')}</div>
        <div className="socially__columns">
          <Swiper {...params}>
            {column1 && (
              <div>
                <SociallyConnectedItem {...getFormattedArticle(column1)} />
              </div>
            )}
            {column2 && (
              <div>
                <SociallyConnectedItem {...getFormattedArticle(column2)} />
              </div>
            )}
            {column3 && (
              <div>
                <SociallyConnectedItem {...getFormattedArticle(column3)} />
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default SociallyConnected
