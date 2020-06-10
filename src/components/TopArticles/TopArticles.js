import React from 'react';

import './TopArticles.scss';

function Article({ title, byline, category, imageUrl }) {
    return (
        <div className="top_articles__columns__column__inner">
            <div className="top_articles__columns__column__image" style={{ backgroundImage: imageUrl ? `url("${imageUrl}")` : '' }} />
            {category && <div className="article__category">{category}</div>}
            {title && <div className="article__title">{title}</div>}
            {byline && <div className="article__description">{byline}</div>}
            <div className="article__more">
                Read More
            </div>
        </div>
    )
}

export default function TopArticles(props) {
    const { featuredArticle, articles, theme } = props;
    console.log(props);
    const getCategoriesString = article => {
        let categoriesNames = '';
        article.categories.nodes.forEach(category => {
            categoriesNames += category.name;
        });
        return categoriesNames;
    }

    const getFormattedArticle = article => {
        const imageObj = article.components.contents && article.components.contents.find(content => content.thumbnailImage);
        const categoryString = getCategoriesString(article);
        const bylineObj = article.components.contents && article.components.contents.find(content => content.byline);
        const formattedArticle = {
            imageUrl: imageObj && imageObj.thumbnailImage.sourceUrl,
            category: categoryString,
            title: article.title,
            byline: bylineObj && bylineObj.byline,
        };
        return formattedArticle;
    }

    const getFeaturedArticle = () => {
        let fArticle = null;
        if (featuredArticle) {
            fArticle = getFormattedArticle(featuredArticle);
        }
        else {
            const firstArticle = articles.column1[0] ? articles.column1[0].article : null;
            fArticle = getFormattedArticle(firstArticle);
        }
        return fArticle;
    }

    const getArticles = (articles) => {
        const newArticles = [];
        articles.map(articleObj => {
            const { article } = articleObj;
            const newArticle = getFormattedArticle(article);
            newArticles.push(newArticle);
        });
        return newArticles;
    }

    const featuredArticleFormatted = getFeaturedArticle();

    return (
        <div className={`top-articles container ${theme}`}>
            <div className="featured-article">
                {featuredArticleFormatted && (
                    <div className="featured-article__inner">
                        {featuredArticleFormatted.imageUrl && (
                            <div className="featured-article__image" style={{ backgroundImage: `url("${featuredArticleFormatted.imageUrl}")` }} />
                        )}
                        {featuredArticleFormatted.category && (
                            <div className="article__category">{featuredArticleFormatted.category}</div>
                        )}
                        {featuredArticleFormatted.title && (
                            <div className="article__title">{featuredArticleFormatted.title}</div>
                        )}
                        {featuredArticleFormatted.byline && (
                            <div className="article__description">{featuredArticleFormatted.byline}</div>
                        )}
                        <div className="article__more">
                            Read More
                        </div>
                    </div>
                )}
            </div>
            <div className="top_articles__columns">
                <div className="top_articles__columns__column">
                    {articles.column1 && articles.column1.length > 0 && getArticles(articles.column1).map((article, index) => (
                        <Article key={index} {...article} />
                    ))}
                    <div className="top_articles__columns__column__divider" />
                </div>
                <div className="top_articles__columns__column">
                    {articles.column2 && articles.column2.length > 0 && getArticles(articles.column2).map((article, index) => (
                        <Article key={index} {...article} />
                    ))}
                    <div className="top_articles__columns__column__divider" />
                </div>
                <div className="top_articles__columns__column">
                    {articles.column3 && articles.column3.length > 0 && getArticles(articles.column3).map((article, index) => (
                        <Article key={index} {...article} />
                    ))}
                </div>
            </div>
        </div>
    )
}
