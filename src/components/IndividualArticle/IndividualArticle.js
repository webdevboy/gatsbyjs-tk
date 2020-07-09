import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Linear } from 'gsap';
import { isBrowser } from 'src/utils/auth';
import ScrollMagic from 'scrollmagic';

import { getFormattedArticle } from 'src/utils/formatArticle';
import convertLinkLocale from 'src/utils/convertLinkLocale';

import './IndividualArticle.scss';

function IndividualArticle({ article, individualArticleImage }) {
  const formattedArticle = getFormattedArticle(article, true);
  const [t, i18n] = useTranslation('article');
  const imgRef = useRef(null);
  const [scrollMagic, setScrollMagic] = useState({
    controller: isBrowser ? new ScrollMagic.Controller() : null,
  });
  const { controller } = scrollMagic;
  useEffect(() => {
    if (!isBrowser) return;
    new ScrollMagic.Scene({
      duration: '200%',
      triggerElement: imgRef.current,
    })
      .setTween(imgRef.current, {
        y: '40%',
        overwrite: 5,
        ease: Linear.easeNone,
      })
      .addTo(controller);
  }, []);
  return (
    formattedArticle && (
      <div className="individual-article-wrapper">
        <div className="individual-article container">
          {individualArticleImage && individualArticleImage.sourceUrl && (
            <div className="individual-article__img-container">
              <img
                className="individual-article__img"
                src={individualArticleImage.sourceUrl}
                ref={imgRef}
              />
            </div>
          )}

          <div className="individual-article__info">
            {formattedArticle.cutline && (
              <div className="individual-article__info__cutline">
                {formattedArticle.cutline}
              </div>
            )}
            {formattedArticle.title && (
              <div className="individual-article__info__title">
                {formattedArticle.title}
              </div>
            )}
            {formattedArticle.byline && (
              <div className="individual-article__info__description">
                {formattedArticle.byline}
              </div>
            )}
            {formattedArticle.articleUrl && (
              <div className="individual-article__info__more">
                <Link
                  className="individual-article__info__more__link"
                  to={convertLinkLocale(
                    formattedArticle.articleUrl,
                    i18n.language
                  )}
                >
                  {t('read-more')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default IndividualArticle;
