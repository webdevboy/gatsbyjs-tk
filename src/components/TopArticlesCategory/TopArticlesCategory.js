import React from 'react';
import cx from 'classnames';
import { navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Parallax } from 'react-scroll-parallax';

import './TopArticlesCategory.scss';
import convertLinkLocale from 'src/utils/convertLinkLocale';
import { isBrowser } from 'src/utils/auth';

function Article({ title, byline, category, imageUrl, articleUrl, t, i18n, isCircle }) {
  return (
    <div
      className="top_articles__columns__column__inner"
      onClick={() => {
        if (articleUrl) {
          navigate(convertLinkLocale(articleUrl, i18n.language));
        }
      }}
    >
      {imageUrl && (
        <Parallax y={[-5, 5]} className={cx('article-img-wrapper', { 'article-circle': isCircle })}>
          <img src={imageUrl} className="article-img" alt="Chef" />
        </Parallax>
      )}
      {category && <div className="article__category" dangerouslySetInnerHTML={{ __html: category }} />}
      {title && <div className="article__title">{title}</div>}
      {byline && <div className="article__description">{byline}</div>}
      <div className="more-divider" />
      {articleUrl && (
        <div className="article__more">
          <span className="article__more__link">{t('read-more')}</span>
        </div>
      )}
    </div>
  );
}

export default function TopArticles({ category, updateParallaxState = () => {} }) {
  const { name, posts } = category;
  const [t, i18n] = useTranslation('article');
  const getFormattedArticle = (article) => {
    if (!article) return null;
    const imageObj =
      article.components.contents &&
      article.components.contents.find((content) => content.thumbnailImage);

    const imageHeroObj =
      article.components.contents &&
      article.components.contents.find(
        (content) =>
          content.fieldGroupName === 'post_Components_Contents_ArticleHero'
      );

    const isCircle =
      article.components.contents &&
      article.components.contents.find(
        content => content.fieldGroupName === 'post_Components_Contents_CircleThumbnail'
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
      isCircle: isCircle && isCircle.isFeaturedImageRounded,
      articleUrl: article.uri,
      id: article.id,
      authors:
        imageHeroObj && imageHeroObj.authors
          ? `Photography by ${imageHeroObj.authors}`
          : null,
    };

    return formattedArticle;
  };

  const getFeaturedArticle = () => {
    let featuredArticle = null;
    if (posts.nodes.length > 0) {
      featuredArticle = posts.nodes.find((node) => {
        if (node.categories.nodes.length > 0) {
          return node.categories.nodes.find(
            (categoryNode) =>
              categoryNode.name.toLowerCase() === 'featured category'
          );
        }
      });
    }
    if (!featuredArticle && posts.nodes.length > 0) {
      featuredArticle = posts.nodes[0];
    }
    return getFormattedArticle(featuredArticle);
  };

  const getArticles = (articles) => {
    const newArticles = [];
    articles &&
      articles.length &&
      articles.map((article) => {
        const newArticle = getFormattedArticle(article);
        newArticles.push(newArticle);
        return article;
      });
    return newArticles;
  };

  const featuredArticleFormatted = getFeaturedArticle();

  const formattedNodes = posts.nodes.filter((node) => {
    const isNotFirst = node.id !== featuredArticleFormatted.id;
    const isFeatured = node.categories.nodes.find(
      (categoryNode) => categoryNode.name.toLowerCase() === 'featured category'
    );
    return isNotFirst && !isFeatured;
  });

  const formattedArticles = getArticles(formattedNodes);
  return (
    <div className="top-articles-container section-landing">
      {name && (
        <h2
          className="category-title"
          dangerouslySetInnerHTML={{ __html: name }}
        />
      )}
      <div className="top-articles container">
        <div className="featured-article">
          {featuredArticleFormatted && (
            <div
              className="featured-article__inner"
              onClick={() => {
                if (featuredArticleFormatted.articleUrl) {
                  navigate(
                    convertLinkLocale(
                      featuredArticleFormatted.articleUrl,
                      i18n.language
                    )
                  );
                }
              }}
            >
              {featuredArticleFormatted.imageUrl && (
                <div className="featured-article__image-container">
                  <Parallax y={[-5, 10]} className="featured-article__image-wrapper">
                    <img
                      className="featured-article__image"
                      src={featuredArticleFormatted.imageUrl}
                      onLoad={updateParallaxState}
                    />
                  </Parallax>
                  {featuredArticleFormatted.authors && (
                    <div className="feature-article__authors">
                      {featuredArticleFormatted.authors}
                    </div>
                  )}
                </div>
              )}
              {name && <div className="article__category" dangerouslySetInnerHTML={{ __html: name }} />}
              {featuredArticleFormatted.title && (
                <div
                  className="article__title"
                  dangerouslySetInnerHTML={{ __html: featuredArticleFormatted.title }}
                />
              )}
              {featuredArticleFormatted.byline && (
                <div className="article__description">
                  {featuredArticleFormatted.byline}
                </div>
              )}
              {featuredArticleFormatted.articleUrl && (
                <div className="article__more">
                  <span className="article__more__link">{t('read-more')}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="top_articles__columns category">
          <div className="top__articles__category">
            {formattedArticles.slice(0, 6).map((article, index) => (
              <div className="top__articles__category__item" key={index}>
                <Article
                  {...{ ...article, category: name }}
                  t={t}
                  i18n={i18n}
                />
              </div>
            ))}
            {((formattedArticles.length % 3) - 1) === 0 &&
            formattedArticles.length > 2 && (
              <div className="fake-border" />
            )}
          </div>
        </div>
      </div>
    {formattedArticles.slice(6).length > 0 && (
      <div className="top-articles__more container">
        {formattedArticles.slice(6).map((article, index) => (
          <div className="top__articles__category__item" key={index}>
            <Article
              {...{ ...article, category: name }}
              t={t}
              i18n={i18n}
            />
          </div>
        ))}
      </div>
    )}
    </div>
  );
}
