import React from "react"
import { Link } from "gatsby"

import { getFormattedArticle } from "src/utils/formatArticle"

import "./IndividualArticle.scss"

function IndividualArticle({ article }) {
  const formattedArticle = getFormattedArticle(article)
  return (
    formattedArticle && (
      <div className="individual-article container">
        {formattedArticle.imageUrl && (
          <div
            className="individual-article__img"
            style={{ backgroundImage: `url("${formattedArticle.imageUrl}")` }}
          />
        )}

        <div className="individual-article__info">
          {formattedArticle.cutline && (
            <div className="individual-article__info__cuteline">
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
                to={formattedArticle.articleUrl}
              >
                Read More
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default IndividualArticle
