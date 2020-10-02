import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { map, path } from 'ramda';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Parallax } from 'react-scroll-parallax';

import replaceAmpersand from 'src/utils/replaceAmpersand';
import { getFormattedArticle } from 'src/utils/formatArticle';

import './DestionationBannerArticles.scss';

const DestionationBannerArticle = ({ article, main, updateParallaxState }) => {
  const [articleImageHeight, setArticleImageHeight] = useState(0);
  const articleImageRef = useRef(null);
  const { t, i18n } = useTranslation('article');

  const articleImageUrl = path(['imageUrl'], article);
  const articleCutline = path(['cutline'], article);
  const articleTitle = path(['title'], article);
  const articleByline = path(['byline'], article);
  const articleUrl = path(['articleUrl'], article);
  const isArticleCircle = path(['isCircle'], article);

  useEffect(() => {
    if(articleImageRef && articleImageRef.current) {
      setArticleImageHeight(articleImageRef.current.offsetWidth);
    }
  }, []);
  return (
    <Link to={articleUrl} className="destionation-articles__main__article__link">
      <div className={classNames('destionation-articles__main__article', { 'destionation-articles__main__article--bottom-padding': !main })}>
        {articleImageUrl && (
          <Parallax y={[-5, 5]} className="destionation-articles__main__article__img-container">
            <img
              src={articleImageUrl}
              ref={articleImageRef}
              onLoad={updateParallaxState}
              className={classNames('destionation-articles__main__article__img', { 'destionation-articles__main__article__img--circle': isArticleCircle })}
              style={{ height: isArticleCircle ? articleImageHeight : 'auto' }}
              alt=""
            />
          </Parallax>
        )}
        {articleCutline && (
          <div className="destionation-articles__main__article__cutline" dangerouslySetInnerHTML={{ __html: replaceAmpersand(articleCutline) }} />
        )}
        {articleTitle && (
          <div className="destionation-articles__main__article__title" dangerouslySetInnerHTML={{ __html: replaceAmpersand(articleTitle) }} />
        )}
        {articleByline && (
          <div className="destionation-articles__main__article__byline" dangerouslySetInnerHTML={{ __html: replaceAmpersand(articleByline) }} />
        )}
        
        {(articleTitle || articleByline) && (
          <div className="destionation-articles__main__article__more">
            {t('read-more')}
          </div>
        )}
      </div>
    </Link>
  );
}

function DestionationBannerArticles({ articles, updateParallaxState }) {
  const articlesArr = [...articles];
  const mainArticles = articlesArr.splice(0, 3);
  let leftArticles = [];
  let rightArticles = [];
  const sortArticles = () => {
    for(let i = 0; i < articlesArr.length; i++) {
      if((i + 1) % 2 === 0) {
        rightArticles.push(articlesArr[i]);
      }
      else {
        leftArticles.push(articlesArr[i]);
      }
    }
  }

  sortArticles();
  return (
    <div className="destionation-articles">
      <div className="destionation-articles__main">
        {map(item => (
          <DestionationBannerArticle article={getFormattedArticle(item.article)} updateParallaxState={updateParallaxState} key={item.article.id} main />
        ), mainArticles)}
      </div>
      <div className="destionation-articles__mobile">
        <div>
          {map(item => (
            <DestionationBannerArticle article={getFormattedArticle(item.article)} updateParallaxState={updateParallaxState} key={item.article.id} />
          ), leftArticles)}
        </div>
        <div>
          {map(item => (
            <DestionationBannerArticle article={getFormattedArticle(item.article)} updateParallaxState={updateParallaxState} key={item.article.id} />
          ), rightArticles)}
        </div>
      </div>
      <div className="destionation-articles__tablet">
        {map(item => (
          <DestionationBannerArticle article={getFormattedArticle(item.article)} updateParallaxState={updateParallaxState} key={item.article.id} />
        ), articlesArr)}
      </div>
    </div>
  );
}

export default DestionationBannerArticles;
