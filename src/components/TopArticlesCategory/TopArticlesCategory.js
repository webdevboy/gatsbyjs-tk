import React from 'react';
import { Link } from 'gatsby';

import '../TopArticlesHome/TopArticles.scss';

function Article({ title, byline, category, imageUrl, articleUrl }) {
    return (
        <div className="top_articles__columns__column__inner">
            <div className="top_articles__columns__column__image" style={{ backgroundImage: imageUrl ? `url("${imageUrl}")` : '' }} />
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

export default function TopArticles({ category }) {
    const { name, posts } = category;

    const getFormattedArticle = article => {
        if(!article) return null;
        const imageObj = article.components.contents && article.components.contents.find(content => content.thumbnailImage);
        const imageHeroObj = article.components.contents && article.components.contents.find(content => content.heroImage);
        const category = article.categories.nodes.find(category => category.name.toLowerCase() !== "featured category")
        const bylineObj = article.components.contents && article.components.contents.find(content => content.byline);
        const formattedArticle = {
            imageUrl: (imageObj && imageObj.thumbnailImage.sourceUrl) || (imageHeroObj && imageHeroObj.heroImage.sourceUrl),
            category: category ? category.name : '',
            title: article.title,
            byline: bylineObj && bylineObj.byline,
            articleUrl: article.uri,
        };
        return formattedArticle;
    }

    const getFeaturedArticle = () => {
        let featuredArticle = null;
        if (posts.nodes.length > 0) {
            featuredArticle = posts.nodes.find(node => {
                if(node.categories.nodes.length > 0) {
                    return node.categories.nodes.find(categoryNode => categoryNode.name.toLowerCase() === 'featured category');
                }
            })
        }
        if(!featuredArticle && posts.nodes.length > 0) {
            
            featuredArticle = posts.nodes[0];
        }
        return getFormattedArticle(featuredArticle);
    }

    const getArticles = (articles) => {
        const newArticles = [];
        articles.map(article => {
            const newArticle = getFormattedArticle(article);
            newArticles.push(newArticle);
            return article;
        });
        return newArticles;
    }
    const featuredArticleFormatted = getFeaturedArticle();
    const column1 = posts.nodes.slice(0, 2);
    const column2 = posts.nodes.slice(2, 4);
    const column3 = posts.nodes.slice(4, 6);

    return (
        <div className="top-articles-container">
            <div className="top-articles container">
                <div className="featured-article">
                    {featuredArticleFormatted && (
                        <div className="featured-article__inner">
                            {featuredArticleFormatted.imageUrl && (
                                <div className="featured-article__image" style={{ backgroundImage: `url("${featuredArticleFormatted.imageUrl}")` }} />
                            )}
                            {name && (
                                <div className="article__category">{name}</div>
                            )}
                            {featuredArticleFormatted.title && (
                                <div className="article__title">{featuredArticleFormatted.title}</div>
                            )}
                            {featuredArticleFormatted.byline && (
                                <div className="article__description">{featuredArticleFormatted.byline}</div>
                            )}
                            {featuredArticleFormatted.articleUrl && (
                                <div className="article__more">
                                    <Link to={featuredArticleFormatted.articleUrl} className="article__more__link">Read more</Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="top_articles__columns">
                    <div className="top_articles__columns__column">
                        {column1 && column1.length > 0 && (
                            <div>
                                {getArticles(column1).map((article, index) => (
                                    <Article key={index} {...{...article, category: name}} />
                                ))}
                                <div className="top_articles__columns__column__divider" />
                            </div>
                        )}
                        
                    </div>
                    <div className="top_articles__columns__column">
                        {column2 && column2.length > 0 && (
                            <div>
                                {getArticles(column2).map((article, index) => (
                                    <Article key={index} {...{...article, category: name}} />
                                ))}
                                <div className="top_articles__columns__column__divider" />
                            </div>
                        )}
                    </div>
                    <div className="top_articles__columns__column">
                        {column3 && column3.length > 0 && (
                            <div>
                                {getArticles(column3).map((article, index) => (
                                    <Article key={index} {...{...article, category: name}} />
                                ))}
                                <div className="top_articles__columns__column__divider" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
