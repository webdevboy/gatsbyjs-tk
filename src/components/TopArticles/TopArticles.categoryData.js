

const ArticleGql = `
    ... on WordPress_Post {
        id
        slug
        title
        author {
            id
            name
        }
        categories {
            nodes {
                name
            }
        }
        components {
            contents {
                ... on WordPress_Post_Components_Contents_ArticleHero {
                    authors
                    byline
                    heroImage {
                        sourceUrl
                    }
                }
                ... on WordPress_Post_Components_Contents_ArticlePostThumbnail {
                    fieldGroupName
                    thumbnailImage {
                        sourceUrl
                    }
                }
            }
        }
    }
`;

/*
 * 
 * 
                */


module.exports = () => {
    return `
    ... on WordPress_Page_Components_Contents_TopArticles {
        fieldGroupName
        articles {
            column1 {
                article {
                    ${ArticleGql}
                }
            }
            column2 {
                article {
                    ${ArticleGql}
                }
            }
            column3 {
                article {
                    ${ArticleGql}
                }
            }
        }
        featuredArticle {
            ${ArticleGql}
        }
    }
  `
}
