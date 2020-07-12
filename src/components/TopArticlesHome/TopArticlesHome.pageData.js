const ArticleGql = `
... on WordPress_Post {
    id
    slug
    title
    uri
    featuredImage {
        sourceUrl
    }
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
                title
                heroImage {
                    sourceUrl
                }
                fieldGroupName
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
`

/*
 *
 *
 */

module.exports = () => `
... on WordPress_Page_Components_Contents_TopArticles {
    fieldGroupName
    articles {
        article {
            ${ArticleGql}
        }
        articleCircleThumbnail
    }
    featuredArticle {
        ${ArticleGql}
    }
}
`
