import React from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import "./FullscreenArticle.scss"
import convertLinkLocale from 'src/utils/convertLinkLocale';

function FullscreenArticle({ article, articleInfoPosition }) {
  const [t, i18n] = useTranslation('article');
  const getArticle = () => {
    let articleObj = null;
    if (!article) return null;
    const { components, categories, uri } = article;
    if (components.contents && components.contents.length > 0) {
      const articleHeroObj = components.contents.find((post) => post.heroImage);
      const category =
        categories.nodes &&
        categories.nodes.length > 0 &&
        categories.nodes.find(
          (node) => node.name.toLowerCase() !== 'featured category'
        );
      articleObj = {
        title: (articleHeroObj && articleHeroObj.title) || '',
        byline: (articleHeroObj && articleHeroObj.byline) || '',
        heroUrl:
          articleHeroObj &&
          articleHeroObj.heroImage &&
          articleHeroObj.heroImage.sourceUrl
            ? articleHeroObj.heroImage.sourceUrl
            : '',
        category,
        uri,
      };
    }
    return articleObj;
  };

  const articleObject = getArticle();
  if (!articleObject) return null;
  return (
    <div
      className={`fullscreen-article ${articleInfoPosition
        .toLowerCase()
        .replace(' ', '-')}`}
      style={{
        backgroundImage: articleObject.heroUrl
          ? `url("${articleObject.heroUrl}")`
          : '',
      }}
    >
      <div className="fullscreen-article__info">
        {articleObject.category && (
          <div className="fullscreen-article__info__category">
            {articleObject.category.name}
          </div>
        )}
        {articleObject.title && (
          <div className="fullscreen-article__info__title">
            {articleObject.title}
          </div>
        )}
        {articleObject.byline && (
          <div className="fullscreen-article__info__description">
            {articleObject.byline}
          </div>
        )}
        {articleObject.uri && (
          <div className="fullscreen-article__info__more">
            <Link
              className="fullscreen-article__info__more__link"
              to={convertLinkLocale(articleObject.uri, i18n.language)}
            >
              {t('read-more')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default FullscreenArticle;
