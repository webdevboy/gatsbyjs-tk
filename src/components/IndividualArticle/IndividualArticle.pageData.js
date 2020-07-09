module.exports = () => {
  return `
  ... on WordPress_Page_Components_Contents_IndividualArticle {
    fieldGroupName
    individualArticleImage {
      sourceUrl
    }
    article {
      ... on WordPress_Post {
        id
        slug
        title
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
              fieldGroupName
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
  `;
};
