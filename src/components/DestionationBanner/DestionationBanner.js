import React from 'react';
import { Link } from 'gatsby';
import { path } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Parallax } from 'react-scroll-parallax';

import replaceAmpersand from 'src/utils/replaceAmpersand';
import { getFormattedArticle } from 'src/utils/formatArticle';

import './DestionationBanner.scss';
import DestionationBannerArticles from './DestionationBannerArticles';
import AdaptiveImage from 'src/components/common/AdaptiveImage/AdaptiveImage';

function DestionationArticles({ cutline, title, backgroundImages, linkArticle, typeColor, linkArticlesOrder, updateParallaxState }) {
  const { t, i18n } = useTranslation('article');
  const desktopImageUrl = path(['desktop', 'sourceUrl'], backgroundImages);
  const tabletImageUrl = path(['tablet', 'sourceUrl'], backgroundImages);
  const mobileImageUrl = path(['mobile', 'sourceUrl'], backgroundImages);
  const headArticle = getFormattedArticle(linkArticle);
  const headArticleCutline = path(['cutline'], headArticle);
  const headArticleTitle = path(['title'], headArticle);
  const headArticleByline = path(['byline'], headArticle);
  const articles = path(['notes'], linkArticlesOrder);
  return (
    <div className="destionation-articles-container">
      <div className="destionation-articles_head" style={{ color: typeColor || '#FFFFFF' }}>
        <Parallax y={[-5, 5]} className="destionation-articles_head__img__container">
          <AdaptiveImage
            src={desktopImageUrl}
            mediumSrc={tabletImageUrl}
            smallSrc={mobileImageUrl}
            innerProps={{
              className: "destionation-articles_head__img"
            }}
          />
        </Parallax>
        <div className="destionation-articles_head__info">
          <div className="destionation-articles_head__info__heading">
            <div className="destionation-articles_head__info__category" dangerouslySetInnerHTML={{ __html: cutline ? replaceAmpersand(headArticleTitle) : '' }} />
            <div className="destionation-articles_head__info__title">
              {title}
            </div>
          </div>
          {linkArticle && (
            <div className="destionation-articles_head__info__article" style={{ color: typeColor || '#FFFFFF' }}>
              {headArticleTitle && (
                <div className="destionation-articles_head__info__article__title" dangerouslySetInnerHTML={{ __html: replaceAmpersand(headArticleTitle) }} />
              )}
              {headArticleByline && (
                <div className="destionation-articles_head__info__article__byline" dangerouslySetInnerHTML={{ __html: replaceAmpersand(headArticleByline) }} />
              )}
              {(headArticleTitle || headArticleByline) && (
                <button type="button" className="destionation-articles_head__info__article__more">
                  {t('read-more')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {linkArticle && (
        <div className="destionation-articles_head_article">
          <Link to={linkArticle.uri}>
            {headArticleCutline && (
              <div className="destionation-articles_head__article__category" dangerouslySetInnerHTML={{__html: replaceAmpersand(headArticleCutline)}} />
            )}
            {headArticleTitle && (
              <div className="destionation-articles_head__article__title" dangerouslySetInnerHTML={{ __html: replaceAmpersand(headArticleTitle) }} />
            )}
            {headArticleByline && (
              <div className="destionation-articles_head__article__description">
                {headArticleByline}
              </div>
            )}
            {(headArticleTitle || headArticleByline) && (
              <div className="destionation-articles_head__article__more">
                {t('read-more')}
              </div>
            )}
          </Link>
        </div>
      )}
      <DestionationBannerArticles {...{ articles, updateParallaxState }} />
    </div>
  )
}

export default DestionationArticles;
