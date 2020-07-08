import React, { useState, useEffect, useRef } from 'react';
import { navigate } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Linear } from 'gsap';
import { isBrowser } from 'src/utils/auth';
import ScrollMagic from 'scrollmagic'

import './TopArticlesCategory.scss';
import convertLinkLocale from 'src/utils/convertLinkLocale';

function Article({ title, byline, category, imageUrl, articleUrl, t, i18n, controller }) {
  const imgRef = useRef(null)
  useEffect(() => {
    if(!isBrowser) return;
    new ScrollMagic.Scene({
      duration: '200%',
      triggerElement: imgRef.current,
    })
      .setTween(imgRef.current, { y: '40%', ease: Linear.easeNone, overwrite: 5 })
      .addTo(controller)
  }, []);
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
        <div className="article-img-wrapper">
          <img src={imageUrl} className="article-img" alt="Chef" ref={imgRef} />
        </div>
      )}
      {category && <div className="article__category">{category}</div>}
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

export default function TopArticles({ category }) {
  const { name, posts } = category;

  const [t, i18n] = useTranslation('article');
  const imgRef = useRef(null);
  const [scrollMagic, setScrollMagic] = useState({
    controller: isBrowser ? new ScrollMagic.Controller() : null,
  });
  const { controller } = scrollMagic;
  useEffect(() => {
    if(!isBrowser) return;
    new ScrollMagic.Scene({
      duration: '200%',
      triggerElement: imgRef.current,
    })
      .setTween(imgRef.current, { y: '20%', overwrite: 5 })
      .addTo(controller)
  }, []);
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

  const formattedArticles = getArticles(formattedNodes).slice(0, 4);

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
                  <div className="featured-article__image-wrapper">
                    <img
                      className="featured-article__image"
                      src={featuredArticleFormatted.imageUrl}
                      ref={imgRef}
                    />
                  </div>
                  {featuredArticleFormatted.authors && (
                    <div className="feature-article__authors">
                      {featuredArticleFormatted.authors}
                    </div>
                  )}
                </div>
              )}
              {name && <div className="article__category">{name}</div>}
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
                  <span className="article__more__link">{t('read-more')}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="top_articles__columns category">
          <div className="top__articles__category">
            {formattedArticles.map((article, index) => (
              <div className="top__articles__category__item" key={index}>
                <Article
                  {...{ ...article, category: name, controller }}
                  t={t}
                  i18n={i18n}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
