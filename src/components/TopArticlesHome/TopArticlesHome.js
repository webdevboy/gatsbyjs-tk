import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import { Link, navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Parallax } from 'react-scroll-parallax';

import './TopArticles.scss';

function Article({
  title,
  byline,
  category,
  imageUrl,
  articleUrl,
  articleCircleThumbnail,
  authors,
  t,
}) {
  return (
    <div
      className="top_articles__columns__column__inner"
      onClick={() => {
        if (articleUrl) {
          navigate(articleUrl);
        }
      }}
    >
      {imageUrl && (
        <Parallax y={[-25, 10]} className={cx('top_articles__columns__column__image-wrapper', { 'article-circle': articleCircleThumbnail })}>
          <img
            className="top_articles__columns__column__image"
            src={imageUrl}
          />
        </Parallax>
      )}
      {category && (
        <div
          className="article__category"
          dangerouslySetInnerHTML={{ __html: category }}
        ></div>
      )}
      {title && <div className="article__title">{title}</div>}
      {byline && <div className="article__description">{byline}</div>}
      {articleUrl && (
        <div className="article__more">
          <span className="article__more__link">{t('read-more')}</span>
        </div>
      )}
    </div>
  );
}

export default function TopArticles(props) {
  const { featuredArticle, articles, theme } = props;
  const [t, i18n] = useTranslation('article');
  const getFormattedArticle = (article) => {
    if (!article) return null;

    const imageHeroObj =
      article.components.contents &&
      article.components.contents.find(
        (content) =>
          content.fieldGroupName === 'post_Components_Contents_ArticleHero'
      );

    const category = article.categories.nodes.find(
      (category) => category.name.toLowerCase() !== 'featured category'
    );

    const bylineObj =
      article.components.contents &&
      article.components.contents.find((content) => content.byline);

    const formattedArticle = {
      imageUrl: article.featuredImage && article.featuredImage.sourceUrl,
      category: category ? category.name : '',
      title: (imageHeroObj && imageHeroObj.title) || article.title,
      byline: bylineObj && bylineObj.byline,
      articleUrl: article.uri,
      authors:
        imageHeroObj && imageHeroObj.authors ? `${imageHeroObj.authors}` : null,
      // articleCircleThumbnail: article.articleCircleThumbnail,
    };

    return formattedArticle;
  };

  const getFeaturedArticle = () => {
    let fArticle = null;
    if (featuredArticle) {
      fArticle = getFormattedArticle(featuredArticle);
    } else {
      const firstArticle =
        articles.column1 && articles.column1.length && articles.column1[0]
          ? articles.column1[0].article
          : null;
      fArticle = getFormattedArticle(firstArticle);
    }
    return fArticle;
  };

  const getArticles = (articles) => {
    const newArticles = [];
    articles &&
      articles.map((articleObj) => {
        console.log(articleObj);
        const { article, articleCircleThumbnail } = articleObj;
        const newArticle = getFormattedArticle(article);
        newArticles.push({ ...newArticle, articleCircleThumbnail });
      });
    return newArticles;
  };

  const featuredArticleFormatted = getFeaturedArticle();
  const formattedARticles = getArticles(articles);
  return (
    <div className="top-articles-container">
      <div className={`top-articles container ${theme}`}>
        <div className="featured-article">
          {featuredArticleFormatted && (
            <div className="featured-article__inner">
              {featuredArticleFormatted.imageUrl && (
                <div className="featured-article__image-container">
                  <Parallax
                    className="featured-article__image-wrapper"
                    y={[-15, 15]}
                    onClick={() => {
                      if (
                        featuredArticleFormatted &&
                        featuredArticleFormatted.articleUrl
                      ) {
                        navigate(featuredArticleFormatted.articleUrl);
                      }
                    }}
                  >
                    <img
                      className="featured-article__image"
                      src={featuredArticleFormatted.imageUrl}
                    />
                  </Parallax>
                  {featuredArticleFormatted.authors && (
                    <div className="feature-article__authors">
                      {featuredArticleFormatted.authors}
                    </div>
                  )}
                </div>
              )}
              {featuredArticleFormatted.category && (
                <div className="article__category">
                  {featuredArticleFormatted.category}
                </div>
              )}
              {featuredArticleFormatted.title && (
                <div className="article__title">
                  {featuredArticleFormatted.title}
                </div>
              )}
              {featuredArticleFormatted.byline && (
                <div className="article__description">
                  {featuredArticleFormatted.byline}
                </div>
              )}
              {featuredArticleFormatted.articleUrl && (
                <div className="article__more">
                  <Link
                    to={featuredArticleFormatted.articleUrl}
                    className="article__more__link"
                  >
                    {t('read-more')}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="top_articles__columns">
          {formattedARticles.map((article, index) => (
            <Article
              {...{
                ...article,
                key: index,
                t,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
