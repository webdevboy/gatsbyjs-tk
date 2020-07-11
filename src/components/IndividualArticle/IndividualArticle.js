import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Parallax } from 'react-scroll-parallax';

import { getFormattedArticle } from 'src/utils/formatArticle';
import convertLinkLocale from 'src/utils/convertLinkLocale';

import './IndividualArticle.scss';

function IndividualArticle({ article, individualArticleImage }) {
  const formattedArticle = getFormattedArticle(article, true);
  const [t, i18n] = useTranslation('article');
  return (
    formattedArticle && (
      <div className="individual-article-wrapper">
        <div className="individual-article container">
          
          {formattedArticle.imageUrl && (
            <Parallax className="individual-article__img-container" y={[-20, 15]} tagOuter="figure">
              <img
                className="individual-article__img"
                src={formattedArticle.imageUrl}
              />
            </Parallax>
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
