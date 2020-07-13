import React, { useState, useEffect, useRef } from 'react';
import Swiper from 'react-id-swiper';
import { Parallax } from 'react-scroll-parallax';
import { navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';

import { MEDIUM_BREAKPOINT } from 'src/utils/breakpoints';
import { getFormattedArticle } from 'src/utils/formatArticle';

import './Chefs.scss';

function Chef({ cutline, title, byline, imageUrl, articleUrl, updateParallaxState }) {
  const [t, i18n] = useTranslation('article');
  useEffect(() => {
    setTimeout(() => {updateParallaxState()}, 0);
  }, [])
  return (
    <div
      className="chefs__columns__column"
      onClick={() => {
        if (articleUrl) {
          navigate(articleUrl);
        }
      }}
    >
      {imageUrl && (
        <div className="chefs__columns__column__img__wrapper">
          <Parallax className="chefs__columns__column__img-wrapper" y={[-25, 15]}>
            <div
              className="chefs__columns__column__img"
              style={{ backgroundImage: `url("${imageUrl}")` }}
            />
          </Parallax>
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
          <span className="chefs__columns__column__info_more__link">
            {t('read-more')}
          </span>
        </div>
      </div>
    </div>
  );
}

function Chefs({ column1, column2, column3, updateParallaxState = () => {} }) {
  const [t, i18n] = useTranslation('common');
  const params = {
    spaceBetween: 20,
    slidesPerView: 1.5,
    noSwiping: false,
    scrollbar: {
      el: '.chefs__scrollbar',
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
  };

  return (
    <div className="chefs">
      <div className="container">
        <div className="chefs__title">{t('chefs-profile')}</div>
        <div className="chefs__columns">
          <Swiper {...params}>
            {column1 && (
              <div>
                <Chef {...getFormattedArticle(column1)} updateParallaxState={updateParallaxState} />
              </div>
            )}
            {column2 && (
              <div>
                <Chef {...getFormattedArticle(column2)} updateParallaxState={updateParallaxState} />
              </div>
            )}
            {column3 && (
              <div>
                <Chef {...getFormattedArticle(column3)} updateParallaxState={updateParallaxState} />
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Chefs;
