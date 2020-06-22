module.exports = () => `
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
`
