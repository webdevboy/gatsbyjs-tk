module.exports = () => {
  return `
  ... on WordPress_Page_Components_Contents_FullscreenArticle {
    fieldGroupName
    articleInfoPosition
    article {
      ... on WordPress_Post {
        id
        uri
        components {
          contents {
            ... on WordPress_Post_Components_Contents_ArticleHero {
              authors
              byline
              title
              heroImage {
                sourceUrl
              }
            }
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
  `
}
