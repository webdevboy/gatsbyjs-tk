import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import Swiper from 'react-id-swiper';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { Parallax } from 'react-scroll-parallax';

import { getFormattedArticle } from 'src/utils/formatArticle';
import {
  MEDIUM_BREAKPOINT,
  LARGE_BREAKPOINT,
  XLARGE_BREAKPOINT,
} from 'src/utils/breakpoints';
import useWindow from 'src/hooks/useWindow';
import BackToTopImg from 'src/images/back-to-top.png';
import convertLinkLocale from 'src/utils/convertLinkLocale';
import './TastingNotes.scss';

const Note = ({ cutline, title, byline, imageUrl, articleUrl, isCircle, t, i18n, updateParallaxState }) => {
  return (
    <div
      className="tasting-notes__note"
      onClick={() => {
        if (articleUrl) {
          navigate(convertLinkLocale(articleUrl, i18n.language));
        }
      }}
    >
      {imageUrl && (
        <Parallax y={[-10, 5]} className={cx('tasting-notes__note__img-wrapper', { circle: isCircle })}>
          <img
            src={imageUrl}
            className="tasting-notes__note__img"
            alt="article thumbnail"
            onLoad={updateParallaxState}
          />
        </Parallax>
      )}
      {cutline && (
        <div
          className="tasting-notes__note__cutline"
          dangerouslySetInnerHTML={{ __html: cutline }}
        />
      )}
      {title && <div className="tasting-notes__note__title">{title}</div>}
      {byline && <div className="tasting-notes__note__byline">{byline}</div>}
      {articleUrl && (
        <div className="tasting-notes__note__more">
          <span className="tasting-notes__note__more__link">
            {t('read-more')}
          </span>
        </div>
      )}
    </div>
  );
}

function TastingNotes({ headline, notes, type, theme, updateParallaxState = () => {} }) {
  const _window = useWindow();
  const [moreThanMedium, setMoreThanMedium] = useState(false);
  const [moreThanLarge, setMoreThanLarge] = useState(false);
  const scrollTop = () => {
    const scrollBlock = document.querySelector('.page-scroll');
    const swipeWrapper = document.querySelector('.swipe-wrapper');
    if(!_window) return;
    if(swipeWrapper) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else if(scrollBlock) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
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
    <div className="tasting-notes-wrapper">
      <div className={`tasting-notes__go-top ${theme}`} onClick={scrollTop}>
        <img src={BackToTopImg} alt="" />
      </div>
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
                    <Note {...getFormattedArticle(note.note)} t={t} i18n={i18n} updateParallaxState={updateParallaxState}/>
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
                    updateParallaxState={updateParallaxState}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TastingNotes;
