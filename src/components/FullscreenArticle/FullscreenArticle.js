import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Parallax } from 'react-scroll-parallax';

import './FullscreenArticle.scss';
import convertLinkLocale from 'src/utils/convertLinkLocale';
import AdaptiveImage from 'src/components/common/AdaptiveImage/AdaptiveImage';

function FullscreenArticle({
  article,
  articleInfoPosition,
  fullScreenArticleImage,
  fullScreenArticleMobileImage,
  updateParallaxState = () => {},
}) {
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
    <div className="fullscreen-article">
      {fullScreenArticleImage && fullScreenArticleImage.sourceUrl && (
        <div className="fullscreen-article__img-wrapper">
          <AdaptiveImage
            src={fullScreenArticleImage.sourceUrl}
            smallSrc={fullScreenArticleMobileImage && fullScreenArticleMobileImage.sourceUrl}
            innerProps={{
              onLoad: updateParallaxState,
              className: "fullscreen-article__img"
            }}
          />
        </div>
        
      )}
      <div
        className={`fullscreen-article__body ${articleInfoPosition
          .toLowerCase()
          .replace(' ', '-')}`}
      >
        <Parallax y={['20%', '-20%']}>
          <Link to={convertLinkLocale(articleObject.uri, i18n.language)} className="fullscreen-article__info">
            {articleObject.category && (
              <div
                className="fullscreen-article__info__category"
                dangerouslySetInnerHTML={{ __html: articleObject.category.name }}
              />
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
                <div
                  className="fullscreen-article__info__more__link"
                >
                  {t('read-more')}
                </div>
              </div>
            )}
          </Link>
        </Parallax>
      </div>
    </div>
  );
}

export default FullscreenArticle;
