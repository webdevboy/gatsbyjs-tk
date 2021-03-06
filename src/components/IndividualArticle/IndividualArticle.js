import React, { useState, useEffect, useRef } from 'react';
import { Link, navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Parallax } from 'react-scroll-parallax';

import { getFormattedArticle } from 'src/utils/formatArticle';
import convertLinkLocale from 'src/utils/convertLinkLocale';

import './IndividualArticle.scss';

function IndividualArticle({ article, individualArticleImage, updateParallaxState = () => {} }) {
  const formattedArticle = getFormattedArticle(article, true);
  const [t, i18n] = useTranslation('article');
  const goToArticle = () => {
    navigate(
      convertLinkLocale(
        formattedArticle.articleUrl,
        i18n.language
      )
    );
  }
  return (
    formattedArticle && (
      <div className="individual-article-wrapper">
        <div className="individual-article container">
          
          {individualArticleImage.sourceUrl && (
            <Parallax className="individual-article__img-container" y={[-5, 10]} tagOuter="figure">
              <img
                className="individual-article__img"
                src={individualArticleImage.sourceUrl}
                onLoad={updateParallaxState}
                onClick={goToArticle}
                alt=""
              />
            </Parallax>
          )}

          <Link
            to={convertLinkLocale(
              formattedArticle.articleUrl,
              i18n.language
            )}
            className="individual-article__info">
            {formattedArticle.cutline && (
              <div
                className="individual-article__info__cutline"
                dangerouslySetInnerHTML={{ __html: formattedArticle.cutline }}
              />
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
                <span
                  className="individual-article__info__more__link"
                >
                  {t('read-more')}
                </span>
              </div>
            )}
          </Link>
        </div>
      </div>
    )
  );
}

export default IndividualArticle;
