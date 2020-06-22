import React from "react"
import { Link } from "gatsby"

import "./TopArticles.scss"

function Article({ title, byline, category, imageUrl, articleUrl }) {
  return (
    <div className="top_articles__columns__column__inner">
      <div
        className="top_articles__columns__column__image"
        style={{ backgroundImage: imageUrl ? `url("${imageUrl}")` : "" }}
      />
      {category && <div className="article__category">{category}</div>}
      {title && <div className="article__title">{title}</div>}
      {byline && <div className="article__description">{byline}</div>}
      {articleUrl && (
        <div className="article__more">
          <Link to={articleUrl} className="article__more__link">
            Read More
          </Link>
        </div>
      )}
    </div>
  )
}

export default function TopArticles(props) {
  const { featuredArticle, articles, theme } = props

  const getFormattedArticle = article => {
    if (!article) return null

    const imageObj =
      article.components.contents &&
      article.components.contents.find(content => content.thumbnailImage)
    const imageHeroObj =
      article.components.contents &&
      article.components.contents.find(content => content.heroImage)
    const category = article.categories.nodes.find(
      category => category.name.toLowerCase() !== "featured category"
    )
    const bylineObj =
      article.components.contents &&
      article.components.contents.find(content => content.byline)
    const formattedArticle = {
      imageUrl:
        (imageObj && imageObj.thumbnailImage.sourceUrl) ||
        (imageHeroObj && imageHeroObj.heroImage.sourceUrl),
      category: category ? category.name : "",
      title: article.title,
      byline: bylineObj && bylineObj.byline,
      articleUrl: article.uri,
    }
    return formattedArticle
  }

  const getFeaturedArticle = () => {
    let fArticle = null
    if (featuredArticle) {
      fArticle = getFormattedArticle(featuredArticle)
    } else {
      const firstArticle = articles.column1[0]
        ? articles.column1[0].article
        : null
      fArticle = getFormattedArticle(firstArticle)
    }
    return fArticle
  }

  const getArticles = articles => {
    const newArticles = []
    articles.map(articleObj => {
      const { article } = articleObj
      const newArticle = getFormattedArticle(article)
      newArticles.push(newArticle)
    })
    return newArticles
  }

  const featuredArticleFormatted = getFeaturedArticle()
  const formattedARticles = getArticles(articles)

  return (
    <div className="top-articles-container">
      <div className={`top-articles container ${theme}`}>
        <div className="featured-article">
          {featuredArticleFormatted && (
            <div className="featured-article__inner">
              {featuredArticleFormatted.imageUrl && (
                <div
                  className="featured-article__image"
                  style={{
                    backgroundImage: `url("${featuredArticleFormatted.imageUrl}")`,
                  }}
                />
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
                    Read more
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="top_articles__columns">
          {formattedARticles.map((article, index) => (
            <Article key={index} {...article} />
          ))}
          {formattedARticles.length > 1 && (
            <div className="top_articles__columns__column__divider first" />
          )}
          {formattedARticles.length > 2 && (
            <div className="top_articles__columns__column__divider second" />
          )}
          {/* <div className="top_articles__columns__column">
                        {articles.column1 && articles.column1.length > 0 && (
                            <div>
                                {getArticles(articles.column1).map((article, index) => (
                                    <Article key={index} {...article} />
                                ))}
                                <div className="top_articles__columns__column__divider" />
                            </div>
                        )}
                        
                    </div>
                    <div className="top_articles__columns__column">
                        {articles.column2 && articles.column2.length > 0 && (
                            <div>
                                {getArticles(articles.column2).map((article, index) => (
                                    <Article key={index} {...article} />
                                ))}
                                <div className="top_articles__columns__column__divider" />
                            </div>
                        )}
                    </div>
                    <div className="top_articles__columns__column">
                        {articles.column3 && articles.column3.length > 0 && (
                            <div>
                                {getArticles(articles.column3).map((article, index) => (
                                    <Article key={index} {...article} />
                                ))}
                                <div className="top_articles__columns__column__divider" />
                            </div>
                        )}
                    </div> */}
        </div>
      </div>
    </div>
  )
}
