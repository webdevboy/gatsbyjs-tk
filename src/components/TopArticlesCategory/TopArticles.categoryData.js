module.exports = () => `
    ... on WordPress_Post_Components_Contents_ArticleHero {
        authors
        byline
        title
        heroImage {
            sourceUrl
        }
        fieldGroupName
    }
    ... on WordPress_Post_Components_Contents_CircleThumbnail {
        fieldGroupName
        isFeaturedImageRounded
    }
`
