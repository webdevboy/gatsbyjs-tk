import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import Swiper from 'react-id-swiper';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { getFormattedArticle } from 'src/utils/formatArticle';
import {
  MEDIUM_BREAKPOINT,
  LARGE_BREAKPOINT,
  XLARGE_BREAKPOINT,
} from 'src/utils/breakpoints';
import convertLinkLocale from 'src/utils/convertLinkLocale';
import './TastingNotes.scss';

const Note = ({ cutline, title, byline, imageUrl, articleUrl, t, i18n }) => (
  <div
    className="tasting-notes__note"
    onClick={() => {
      if (articleUrl) {
        navigate(convertLinkLocale(articleUrl, i18n.language));
      }
    }}
  >
    {imageUrl && (
      <img
        src={imageUrl}
        className="tasting-notes__note__img"
        alt="article thumbnail"
      />
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
        <Link
          to={convertLinkLocale(articleUrl, i18n.language)}
          className="tasting-notes__note__more__link"
        >
          {t('read-more')}
        </Link>
      </div>
    )}
  </div>
);

function TastingNotes({ headline, notes, type, theme }) {
  const [moreThanMedium, setMoreThanMedium] = useState(false);
  const [moreThanLarge, setMoreThanLarge] = useState(false);
  const [t, i18n] = useTranslation(['article', 'common']);

  const setLayout = (width) => {
    if (width < MEDIUM_BREAKPOINT) {
      setMoreThanMedium(false);
      setMoreThanLarge(false);
    } else if (width >= MEDIUM_BREAKPOINT && width < LARGE_BREAKPOINT) {
      setMoreThanMedium(true);
      setMoreThanLarge(false);
    } else if (width > LARGE_BREAKPOINT) {
      setMoreThanLarge(true);
      setMoreThanMedium(false);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', (e) => {
      setLayout(window.innerWidth);
    });

    setLayout(window.innerWidth);
  }, []);

  const params = {
    spaceBetween: 20,
    slidesPerView: 'auto',
    noSwiping: false,
    scrollbar: {
      el: '.tasting-notes__scrollbar',
      hide: false,
      draggable: true,
      dragSize: 68,
    },
    breakpoints: {
      [MEDIUM_BREAKPOINT]: {
        slidesPerView: 'auto',
        spaceBetween: 41,
        scrollbar: {
          dragSize: 125,
        },
      },
      [XLARGE_BREAKPOINT]: {
        slidesPerView: 'auto',
        spaceBetween: 41,
        scrollbar: {
          dragSize: 125,
        },
      },
    },
  };

  return (
    <div className={`tasting-notes ${theme}`}>
      <div className="tasting-notes__title">
        {headline ? headline : t('common:tasting-notes')}
      </div>
      <div className="tasting-notes__slider-container">
        <div className={cx({ hidden: moreThanMedium && !moreThanLarge })}>
          <Swiper {...params}>
            {notes &&
              notes.length > 0 &&
              notes.map((note, index) => (
                <div key={index}>
                  <Note {...getFormattedArticle(note.note)} t={t} i18n={i18n} />
                </div>
              ))}
          </Swiper>
        </div>
        {moreThanMedium && !moreThanLarge && (
          <div className="tasting-notes__medium-size">
            {notes &&
              notes.length > 0 &&
              notes.map((note, index) => (
                <Note
                  {...getFormattedArticle(note.note)}
                  t={t}
                  i18n={i18n}
                  key={index}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TastingNotes;
