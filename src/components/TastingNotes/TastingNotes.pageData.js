module.exports = () => `
... on WordPress_Page_Components_Contents_TastingNotes {
  fieldGroupName
  notes {
    note {
      ... on WordPress_Post {
        id
        title
        slug
        uri
        featuredImage {
          sourceUrl
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
            ... on WordPress_Post_Components_Contents_CircleThumbnail {
              fieldGroupName
              isFeaturedImageRounded
            }
          }
        }
      }
    }
  }
}
`
